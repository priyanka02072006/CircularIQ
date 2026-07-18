import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const initialListings = [
  {
    id: 'mat-001',
    title: 'High-Grade Recycled Polyethylene (HDPE)',
    category: 'Polymers',
    quantity: '50 Tons',
    price: '$850 / Ton',
    purity: '98.5%',
    carbonSaved: '120 Tons CO₂e',
    carbonFactor: 2.4, // tons CO2 saved per ton of material
    disposalCostAvoided: '$12,500',
    marketValue: '$42,500',
    location: 'Houston, TX',
    coordinates: { x: 450, y: 350 }, // coordinates on our custom map
    seller: 'TexChem Solutions Inc.',
    description: 'Post-industrial recycled HDPE pellets, washed and pelletized. Suitable for blow molding and pipe extrusion applications. Free from heavy metals.',
    specifications: [
      { name: 'Melt Flow Index', value: '2.1 g/10 min' },
      { name: 'Density', value: '0.952 g/cm³' },
      { name: 'Contamination', value: '< 0.05%' },
      { name: 'Source', value: 'Industrial blow-molded containers' }
    ],
    aiInsights: {
      classification: 'Polyolefin Thermoplastic (Recyclable)',
      demandForecast: 'High (+12% projected for Q4)',
      pricePrediction: 'Expected stable at $840–$870/Ton',
      remanufactureIdeas: ['Drainage pipes', 'Heavy-duty storage bins', 'Agricultural crates'],
      logisticsScore: 'Optimal (Direct rail connection available)'
    },
    suggestedBuyers: [
      { name: 'AquaPipes Manufacturing', matchScore: '96%', distance: '45 miles' },
      { name: 'GeoSynthetics Corp', matchScore: '91%', distance: '120 miles' }
    ],
    images: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&q=80&w=600']
  },
  {
    id: 'mat-002',
    title: 'Refined Blast Furnace Slag',
    category: 'Minerals & Slag',
    quantity: '250 Tons',
    price: '$45 / Ton',
    purity: '96.2%',
    carbonSaved: '215 Tons CO₂e',
    carbonFactor: 0.86,
    disposalCostAvoided: '$25,000',
    marketValue: '$11,250',
    location: 'Gary, IN',
    coordinates: { x: 550, y: 180 },
    seller: 'Midwest Steel Group',
    description: 'Granulated blast furnace slag processed through water quenching. Excellent cementitious properties for concrete formulation.',
    specifications: [
      { name: 'Glass Content', value: '95%' },
      { name: 'Moisture', value: '< 1.0%' },
      { name: 'Fineness', value: '420 m²/kg' },
      { name: 'Basicity Index', value: '1.15' }
    ],
    aiInsights: {
      classification: 'Supplementary Cementitious Material (SCM)',
      demandForecast: 'Steady (Correlated with highway construction seasons)',
      pricePrediction: 'Increasing (+4% due to Portland cement supply limits)',
      remanufactureIdeas: ['High-durability concrete', 'Road base stabilization', 'Eco-friendly building blocks'],
      logisticsScore: 'Moderate (Waterways barge delivery recommended)'
    },
    suggestedBuyers: [
      { name: 'Apex Infrastructure Concrete', matchScore: '98%', distance: '12 miles' },
      { name: 'Great Lakes Portland Cement', matchScore: '94%', distance: '38 miles' }
    ],
    images: ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600']
  },
  {
    id: 'mat-003',
    title: 'Recycled Structural Steel H-Beams',
    category: 'Metals',
    quantity: '80 Tons',
    price: '$610 / Ton',
    purity: '100% Structural Steel',
    carbonSaved: '112 Tons CO₂e',
    carbonFactor: 1.4,
    disposalCostAvoided: '$16,000',
    marketValue: '$48,800',
    location: 'Pittsburgh, PA',
    coordinates: { x: 620, y: 210 },
    seller: 'Keystone Deconstruction LLC',
    description: 'Recovered structural steel H-beams from a commercial facility dismantle. Inspected for structural integrity and weldability. Sandblasted and primed.',
    specifications: [
      { name: 'Grade', value: 'ASTM A992 / A572 Gr. 50' },
      { name: 'Flange Width', value: '12 inches' },
      { name: 'Length', value: '20–40 ft mixed' },
      { name: 'Testing Cert', value: 'Visual & Ultrasonic UT Passed' }
    ],
    aiInsights: {
      classification: 'Structural Grade Structural Steel',
      demandForecast: 'Extremely High (Driven by green building credits / LEED demand)',
      pricePrediction: 'Expected range $600–$625/Ton next 60 days',
      remanufactureIdeas: ['Green architectural frameworks', 'Warehouse framing', 'Temporary shoring'],
      logisticsScore: 'Excellent (Flatbed depot adjacent to seller site)'
    },
    suggestedBuyers: [
      { name: 'Vanguard Eco-Builders', matchScore: '97%', distance: '28 miles' },
      { name: 'IronClad Infrastructure', matchScore: '89%', distance: '74 miles' }
    ],
    images: ['https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600']
  },
  {
    id: 'mat-004',
    title: 'High-Purity Recovered Battery Cathode Powders',
    category: 'Battery Materials',
    quantity: '8 Tons',
    price: '$32,000 / Ton',
    purity: '99.1%',
    carbonSaved: '224 Tons CO₂e',
    carbonFactor: 28.0,
    disposalCostAvoided: '$72,000',
    marketValue: '$256,000',
    location: 'Reno, NV',
    coordinates: { x: 180, y: 220 },
    seller: 'LithiumCycle Labs',
    description: 'Recovered Lithium Cobalt Oxide (LCO) and NMC cathode powders from post-manufacturing lithium-ion battery scrap. Hydrometallurgically refined.',
    specifications: [
      { name: 'Lithium Content', value: '7.1 wt%' },
      { name: 'Cobalt Content', value: '15.4 wt%' },
      { name: 'Nickel Content', value: '28.2 wt%' },
      { name: 'Particle Size (D50)', value: '11.5 µm' }
    ],
    aiInsights: {
      classification: 'Refined Cathode Active Material (CAM)',
      demandForecast: 'Exponential Growth (+34% YoY)',
      pricePrediction: 'Volatile. Rising due to cobalt/nickel mining crunches',
      remanufactureIdeas: ['Next-gen EV battery packs', 'Stationary grid storage batteries', 'Consumer electronics packs'],
      logisticsScore: 'High Care (Requires Class 9 Hazmat transport packaging)'
    },
    suggestedBuyers: [
      { name: 'Apex Volt Batteries', matchScore: '99%', distance: '150 miles' },
      { name: 'Nexus Energy Tech', matchScore: '92%', distance: '310 miles' }
    ],
    images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600']
  },
  {
    id: 'mat-005',
    title: 'Industrial Organic Bio-Waste',
    category: 'Organics',
    quantity: '180 Tons',
    price: '$15 / Ton',
    purity: '92.0% Organic Solid',
    carbonSaved: '324 Tons CO₂e', // Methane emission diversion factor
    carbonFactor: 1.8,
    disposalCostAvoided: '$14,400',
    marketValue: '$2,700',
    location: 'Sacramento, CA',
    coordinates: { x: 120, y: 190 },
    seller: 'Valley Agri-Processing',
    description: 'Consistent organic processing residues (grape pomace, fruit pulp). High nutrient load. Excellent feedstock for anaerobic digesters or composting.',
    specifications: [
      { name: 'Moisture Content', value: '62%' },
      { name: 'pH Level', value: '4.2' },
      { name: 'Nitrogen (N)', value: '1.8%' },
      { name: 'Carbon-Nitrogen Ratio', value: '22:1' }
    ],
    aiInsights: {
      classification: 'Industrial Organic By-product',
      demandForecast: 'Steady (High seasonal demand for composting/biogas)',
      pricePrediction: 'Expected range $12–$18/Ton',
      remanufactureIdeas: ['Biogas generation Feedstock', 'Agricultural compost', 'Bio-char manufacturing'],
      logisticsScore: 'Optimal (Local logistics fleet specialized in tankers available)'
    },
    suggestedBuyers: [
      { name: 'Sacramento Biogas Energy', matchScore: '99%', distance: '9 miles' },
      { name: 'Verdant Soil Products', matchScore: '95%', distance: '24 miles' }
    ],
    images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=600']
  }
];

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  const [user, setUser] = useState({
    name: 'Sarah Jenkins',
    role: 'Director of Sustainability',
    company: 'EcoFlow Technologies',
    industry: 'Advanced Manufacturing & Assembly',
    location: 'Detroit, MI',
    esgScore: 88,
    isVerified: true,
    certifications: ['ISO 14001', 'LEED Gold Enterprise', 'TRUE Zero Waste (Silver)'],
    carbonSavings: 2450, // tons CO2e this year
    wasteDiverted: 1280, // tons
    financialBenefit: 184500, // USD
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('landing');
  const [listings, setListings] = useState(initialListings);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  
  const [favorites, setFavorites] = useState(['mat-001', 'mat-004']);
  const [savedSearches, setSavedSearches] = useState([
    { id: '1', query: 'Recycled polymers Texas', filters: { category: 'Polymers' } },
    { id: '2', query: 'Battery metals NV', filters: { category: 'Battery Materials' } }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'New Bid Received',
      message: 'AquaPipes Ltd. submitted a bid of $820/Ton for your HDPE listing.',
      time: '12 minutes ago',
      read: false,
      type: 'bid'
    },
    {
      id: 'notif-2',
      title: 'Optimal Logistics Route Calculated',
      message: 'AI Copilot generated a multimodal logistics plan for your Gary, IN shipment, saving 15% in costs.',
      time: '1 hour ago',
      read: false,
      type: 'logistics'
    },
    {
      id: 'notif-3',
      title: 'ESG Annual Report Ready',
      message: 'Your Q2 ESG Carbon Intelligence report has been generated and verified by the blockchain ledger.',
      time: '1 day ago',
      read: true,
      type: 'esg'
    }
  ]);

  const [chats, setChats] = useState({
    'TexChem Solutions Inc.': [
      { sender: 'them', text: 'Hi Sarah, regarding the HDPE pellets: they are double-washed. Can you handle bulk rail containers?', time: '10:45 AM' },
      { sender: 'me', text: 'Hello! Yes, our Detroit facility has a direct rail spur. What is the moisture level after pelletizing?', time: '10:50 AM' },
      { sender: 'them', text: 'It is typically below 0.1%. We can ship a sample bag next week if that works.', time: '10:52 AM' }
    ],
    'LithiumCycle Labs': [
      { sender: 'them', text: 'Hi, we saw your interest in the LCO Cathode Powder. We have regular supply agreements available.', time: 'Yesterday' },
      { sender: 'me', text: 'Excellent. What is the average lead time for batch testing reports?', time: 'Yesterday' }
    ]
  });

  const [activeChatCompany, setActiveChatCompany] = useState('TexChem Solutions Inc.');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const login = (email, password) => {
    setIsAuthenticated(true);
    setActiveTab('dashboard');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setActiveTab('landing');
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const addListing = (newListing) => {
    const freshListing = {
      ...newListing,
      id: `mat-${Date.now()}`,
      coordinates: { x: Math.floor(Math.random() * 600) + 100, y: Math.floor(Math.random() * 300) + 100 },
      seller: user.company,
      suggestedBuyers: [
        { name: 'Eco-Processors LLC', matchScore: '94%', distance: '35 miles' },
        { name: 'Apex Recycling Group', matchScore: '89%', distance: '78 miles' }
      ]
    };
    setListings(prev => [freshListing, ...prev]);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const sendMessage = (company, text) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChats(prev => ({
      ...prev,
      [company]: [...(prev[company] || []), { sender: 'me', text, time: timeStr }]
    }));

    setTimeout(() => {
      setChats(prev => ({
        ...prev,
        [company]: [
          ...(prev[company] || []),
          {
            sender: 'them',
            text: `Thanks for your message! Our logistics team will review this request and get back to you shortly.`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }));
      setNotifications(prevNotif => [
        {
          id: `notif-${Date.now()}`,
          title: `New message from ${company}`,
          message: `Received a response regarding your material exchange query.`,
          time: 'Just now',
          read: false,
          type: 'chat'
        },
        ...prevNotif
      ]);
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        activeTab,
        setActiveTab,
        listings,
        addListing,
        selectedMaterialId,
        setSelectedMaterialId,
        favorites,
        toggleFavorite,
        savedSearches,
        notifications,
        markNotificationAsRead,
        chats,
        sendMessage,
        activeChatCompany,
        setActiveChatCompany,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
