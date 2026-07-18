import React, { createContext, useContext, useState } from 'react';
import { useApp } from './AppContext';

const CopilotContext = createContext();

export const useCopilot = () => useContext(CopilotContext);

export const CopilotProvider = ({ children }) => {
  const { listings, user } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 'copilot-1',
      sender: 'copilot',
      text: `Hello ${user.name}! I am your CircularIQ AI Sustainability Copilot. 

I can assist you with:
• Classifying your factory waste streams and identifying alternative reuse applications.
• Estimating the market value and CO₂ carbon savings of resource exchanges.
• Generating circular matches and logistics routing advice for transport optimization.
• Drafting ESG compliance audit reports.

How can I help you optimize your industrial resource efficiency today?`,
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const getSmartResponse = (query) => {
    const q = query.toLowerCase();
    
    // Help with classification / waste optimization
    if (q.includes('plastic') || q.includes('polymer') || q.includes('hdpe') || q.includes('pet')) {
      return `### AI Material Analysis: Recycled Polyethylene / Polymers

Based on standard chemical specifications for post-industrial polymers, here is your CircularIQ Optimization roadmap:

#### 1. Material Classification
• **Primary Class**: High-Density Polyethylene (HDPE) - Grade A Regrind
• **Alternative Use Cases**: Double-walled agricultural drainage conduits, structural composite decking, logistics crates.

#### 2. Circularity Metrics
• **CO₂ Avoidance Potential**: ~2.4 Tons CO₂e saved per ton of virgin polymer replaced.
• **Disposal Cost Reduction**: Diverting this waste from US landfills saves an average of **$250/Ton** in tipping fees and EPA containment taxes.

#### 3. Matchmaking & Logistics
• **Potential Local Buyers**: 
  - **AquaPipes Manufacturing** (45 miles away) - active demand for structural piping.
  - **GeoSynthetics Corp** (120 miles away) - requires feedstock for geo-membranes.
• **Logistics Optimization**: We recommend palletized logistics. Direct flatbed line-haul has a logistics efficiency score of **94%** due to backhaul lane availability.

Would you like me to generate a draft contract for this exchange?`;
    }

    if (q.includes('steel') || q.includes('metal') || q.includes('slag') || q.includes('mineral')) {
      return `### AI Industrial By-Product Analysis: Slag / Ferrous Metals

Here are the optimized reuse pathways for metallurgical and construction waste by-products:

#### 1. Circular Pathway Recommendation
• **Current Pathway**: Slag is routed to landfills at $40/Ton tipping fees.
• **Optimized Pathway**: Hydrometallurgical quenching converts slag to Ground Granulated Blast-Furnace Slag (GGBFS), suitable as a 30-50% Portland cement replacement in concrete formulations.

#### 2. Environmental & Financial Benefits
• **Scope 3 Carbon Impact**: Avoids **0.86 Tons CO₂e** per ton of Portland cement replaced.
• **Revenue Stream**: Processed slag sells at **$45–$55/Ton** instead of costing money to landfill.

#### 3. Proximity Matching
• **Strategic Buyer**: **Apex Infrastructure Concrete** is located within **12 miles** of your primary Midwest foundry. Integrating this loop cuts logistics emissions by **88%** compared to shipping virgin aggregate from aggregate quarries.

Would you like to auto-list this slag stream on the Marketplace?`;
    }

    if (q.includes('lithium') || q.includes('battery') || q.includes('cathode')) {
      return `### AI Critical Mineral Optimization: Lithium-Ion Cathode Material

Analyzing critical mineral recovery for post-manufacturing lithium battery scrap:

#### 1. Material Chemistry
• **Composition**: Recovered NMC (Nickel-Manganese-Cobalt) and Lithium Cobalt Oxide (LCO) active powders.
• **Refinement grade**: Hydrometallurgically recovered, 99.1% pure battery-grade.

#### 2. Economic & Carbon Performance
• **Carbon Savings**: Saves an astronomical **28.0 Tons CO₂e** per ton of material, bypassing virgin extraction and refining in global supply chains.
• **Market Value**: Secondary battery materials market shows a robust value of **$32,000 / Ton** for processed cathode active material.

#### 3. Logistics & Compliance
• **Hazmat Warning**: This material is flagged as Class 9 Hazardous Material. Logistics must use certified UN-rated explosion-proof steel drums and GPS-tracked Temperature Controlled freight.
• **Top Buyer**: **Apex Volt Batteries** (150 miles away) has a matching requisition open for recycled cathode powders.

Should I initialize a secure compliance transfer protocol?`;
    }

    if (q.includes('esg') || q.includes('report') || q.includes('carbon') || q.includes('scope')) {
      return `### ESG Sustainability Reporting & Audit Outline

Here is the draft ESG summary for **${user.company}** for the current fiscal period:

| Key Metric | Status / Value | Performance vs. Benchmark |
| :--- | :--- | :--- |
| **Total Carbon Saved** | **${user.carbonSavings} Tons CO₂e** | Top 12% in Advanced Manufacturing |
| **Landfill Diversion Rate** | **${user.wasteDiverted} Tons (89.4%)** | +6.2% improvement from Q1 |
| **Circular Economy Revenue** | **$184,500 Generated** | Avoided $112,000 disposal cost |
| **Sustainability Rating** | **88/100 (Grade A)** | CircularIQ ESG Platinum Certified |

#### Recommended Actions to reach 95+ score:
1. Transition **Valley Agri-Processing** organic residues to nearby biogas facilities.
2. Formulate a rail-barge multimodal logistics policy for Midwestern slag shipments.
3. Digitally sign these carbon offsets on our ledger for SEC and Corporate Sustainability Reporting Directive (CSRD) audits.

Would you like to export this data to a verified PDF/Excel ESG audit file?`;
    }

    // Default reply
    return `### CircularIQ AI Copilot Response

I have analyzed your request regarding: **"${query}"** in the context of industrial circular operations.

#### Circular IQ General Recommendations:
1. **Source Segregation**: Ensure all industrial scrap is segregated at the point of manufacture. Cross-contamination between different materials (e.g. polymers and food residues) reduces market value by up to 60%.
2. **Carbon Value Math**: Every ton of waste diverted from landfill saves not just tipping fees but directly lowers your Scope 3 emissions. This can be integrated into your company's carbon ledger.
3. **Logistics Optimization**: Combining shipments with neighboring industrial plants in the Detroit area can reduce regional transport costs by 22% through cargo consolidation.

You can ask me specific questions like:
- *"How can I recycle 50 tons of industrial plastics?"*
- *"Find buyers for our scrap steel H-beams"*
- *"Provide logistics advice for shipping batteries"*
- *"Show my company's ESG performance metrics"*`;
  };

  const askCopilot = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const responseText = getSmartResponse(text);
      const copilotMessage = {
        id: `copilot-${Date.now()}`,
        sender: 'copilot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, copilotMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <CopilotContext.Provider value={{ messages, isTyping, askCopilot }}>
      {children}
    </CopilotContext.Provider>
  );
};
