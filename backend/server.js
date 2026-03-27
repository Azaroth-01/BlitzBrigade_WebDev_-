import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Health Check
app.get('/', (req, res) => res.send('Rta Backend Online'));

// The Core Calculation Endpoint
app.post('/api/calculate', async (req, res) => {
    try {
        const { model, requests, tokens, region } = req.body;
        
        // 1. Proxy Math 
        const baseEnergyPerRequest = 0.0002; // Base kWh per unit
        const kwh = requests * baseEnergyPerRequest * (tokens / 100);
        
        const totalKwh = kwh.toFixed(2);
        const totalCo2 = (kwh * 400).toFixed(2); // ~400g CO2 per kWh
        const totalWater = (kwh * 1.8).toFixed(2); // ~1.8L water per kWh
        
        const score = Math.max(10, 100 - (kwh * 400 / 10)); // Arbitrary 0-100 score
        

        // NEW: JPT Calculation (Simulated hardware telemetry)
        // 1 kWh = 3,600,000 Joules. 
        // We'll calculate Joules per token based on your requests and energy.
        const totalTokens = requests * tokens;
        const totalJoules = kwh * 3600000;
        const jpt = (totalJoules / totalTokens).toFixed(2);
        // 2. Ask Gemini for Recommendations
        const aiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `A user is making ${requests} daily requests to a ${model} AI model hosted in ${region}, generating ${totalCo2}g of CO2 and consuming ${totalWater} Liters of cooling water. Give me exactly 3 short, highly actionable technical tips to reduce this specific AI energy, carbon, and water footprint. Return them as a JSON array of strings.`;
        
        const result = await aiModel.generateContent(prompt);
        // Clean the response to ensure it parses correctly
        const recommendationsText = result.response.text().replace(/```json|```/g, '');
        const recommendations = JSON.parse(recommendationsText);

        // 3. Assemble and Send Payload to Frontend
        // 3. Assemble and Send Payload to Frontend
        res.json({
            score: Math.round(score),
            totalKwh,
            totalCo2,
            totalWater,
            jpt, 
            recommendations,
            comparisonData: [
                { name: 'Your Usage', co2: parseFloat(totalCo2) },
                { name: 'Optimized', co2: parseFloat(totalCo2) * 0.4 },
                { name: 'Industry Avg', co2: parseFloat(totalCo2) * 1.5 }
            ],
            trendData: Array.from({length: 7}, (_, i) => {
                const fluctuation = (1 + (Math.random() * 0.4 - 0.2));
                return {
                    day: `Day ${i+1}`,
                    emissions: parseFloat((totalCo2 * fluctuation).toFixed(2)),
                    water: parseFloat((totalWater * fluctuation).toFixed(2)) 
                };
            }),
            radarData: [
                { subject: 'Carbon', A: score, fullMark: 100 },
                { subject: 'Water', A: 100 - (totalWater / 10), fullMark: 100 },
                { subject: 'Energy (JPT)', A: Math.max(20, 100 - (jpt * 10)), fullMark: 100 },
                { subject: 'Compute Density', A: 85, fullMark: 100 },
                { subject: 'SLA Efficiency', A: 75, fullMark: 100 },
            ]
        });
    } catch (error) {
        console.error("Error calculating footprint:", error);
        res.status(500).json({ error: 'Calculation failed' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));