import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapView } from '../components/MapView';
import { 
  Grid, 
  Map, 
  SlidersHorizontal, 
  Search, 
  Plus, 
  Leaf, 
  MapPin, 
  Layers, 
  X,
  Heart
} from 'lucide-react';

export const Marketplace = () => {
  const { 
    listings, 
    addListing, 
    setSelectedMaterialId, 
    setActiveTab, 
    favorites, 
    toggleFavorite 
  } = useApp();

  const [viewMode, setViewMode] = useState('grid'); // grid or map
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Polymers');
  const [formQuantity, setFormQuantity] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formPurity, setFormPurity] = useState('95%');
  const [formLocation, setFormLocation] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const categories = ['All', 'Polymers', 'Metals', 'Battery Materials', 'Minerals & Slag', 'Organics'];

  // Handle form submission
  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!formTitle || !formQuantity || !formPrice || !formLocation) return;

    // Estimate carbon savings dynamically for the preview based on category
    let factor = 1.2;
    if (formCategory === 'Polymers') factor = 2.4;
    if (formCategory === 'Metals') factor = 1.4;
    if (formCategory === 'Battery Materials') factor = 28.0;
    if (formCategory === 'Minerals & Slag') factor = 0.86;
    if (formCategory === 'Organics') factor = 1.8;

    const quantityNum = parseFloat(formQuantity) || 0;
    const carbonSavedVal = `${Math.round(quantityNum * factor)} Tons CO₂e`;

    const newListing = {
      title: formTitle,
      category: formCategory,
      quantity: `${formQuantity} Tons`,
      price: `$${formPrice} / Ton`,
      purity: formPurity,
      carbonSaved: carbonSavedVal,
      carbonFactor: factor,
      disposalCostAvoided: `$${Math.round(quantityNum * 250)}`,
      marketValue: `$${Math.round(quantityNum * (parseFloat(formPrice) || 10))}`,
      location: formLocation,
      description: formDescription,
      specifications: [
        { name: 'Purity Level', value: formPurity },
        { name: 'Source Type', value: 'Post-Industrial Residue' },
        { name: 'Form Factor', value: 'Mixed / Pelletized' }
      ],
      aiInsights: {
        classification: `${formCategory} Grade Recyclate`,
        demandForecast: 'Moderate (+5% projected)',
        pricePrediction: 'Stable range forecast',
        remanufactureIdeas: ['Packaging materials', 'Raw industrial inputs', 'Alternative building blocks'],
        logisticsScore: 'Awaiting shipping routing calculation'
      },
      images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=600']
    };

    addListing(newListing);

    // Reset Form
    setFormTitle('');
    setFormQuantity('');
    setFormPrice('');
    setFormLocation('');
    setFormDescription('');
    setShowCreateForm(false);
  };

  // Filter listings
  const filteredListings = listings.filter(lst => {
    const matchesSearch = lst.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lst.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lst.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || lst.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="marketplace-view">
      {/* Search and Filters Header */}
      <div className="marketplace-header glass">
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search material listing streams, chemical specs, seller sites..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="marketplace-search-input"
          />
        </div>

        <div className="marketplace-actions">
          <button 
            className={`btn-secondary ${showFilterDrawer ? 'active' : ''}`}
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
          
          <div className="view-toggle-group glass">
            <button 
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={16} />
            </button>
            <button 
              className={`view-toggle-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <Map size={16} />
            </button>
          </div>

          <button onClick={() => setShowCreateForm(true)} className="btn-primary">
            <Plus size={16} /> List Material
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="category-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Map View Mode */}
      {viewMode === 'map' && (
        <div style={{ marginBottom: '24px' }} className="animate-fade-in">
          <MapView onSelectMaterial={(id) => {
            setSelectedMaterialId(id);
            setActiveTab('material-detail');
          }} />
        </div>
      )}

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <div className="empty-state-card glass">
          <Layers size={48} className="text-secondary animate-pulse" />
          <h3 className="font-display">No Material Streams Found</h3>
          <p>Try adjusting your filters, modifying search keywords, or list a new by-product supply.</p>
          <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="btn-secondary">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="listings-grid">
          {filteredListings.map(lst => {
            const isFav = favorites.includes(lst.id);
            return (
              <div 
                key={lst.id} 
                className="listing-card glass hover-lift"
              >
                <div className="listing-card-image-wrapper">
                  <img src={lst.images[0]} alt={lst.title} className="listing-card-image" />
                  <span className="listing-category-badge">{lst.category}</span>
                  
                  {/* Favorite button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(lst.id);
                    }} 
                    className={`fav-btn-bubble ${isFav ? 'active' : ''}`}
                  >
                    <Heart size={16} fill={isFav ? '#ef4444' : 'none'} />
                  </button>
                </div>

                <div className="listing-card-body">
                  <div className="listing-card-header">
                    <h3 
                      className="listing-title font-display"
                      onClick={() => {
                        setSelectedMaterialId(lst.id);
                        setActiveTab('material-detail');
                      }}
                    >
                      {lst.title}
                    </h3>
                    <div className="listing-seller-info">
                      <span>Listed by: <strong>{lst.seller}</strong></span>
                    </div>
                  </div>

                  <p className="listing-desc-excerpt">
                    {lst.description.substring(0, 100)}...
                  </p>

                  <div className="listing-specs-grid">
                    <div className="spec-stat">
                      <span>Volume:</span>
                      <strong>{lst.quantity}</strong>
                    </div>
                    <div className="spec-stat">
                      <span>Purity:</span>
                      <strong>{lst.purity}</strong>
                    </div>
                    <div className="spec-stat">
                      <span>Location:</span>
                      <strong style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <MapPin size={10} /> {lst.location}
                      </strong>
                    </div>
                  </div>

                  <div className="listing-card-benefits">
                    <div className="benefit-badge carbon">
                      <Leaf size={12} /> {lst.carbonSaved} Avoided
                    </div>
                    <div className="benefit-badge financial">
                      Value: {lst.price}
                    </div>
                  </div>

                  <div className="listing-card-footer">
                    <button 
                      onClick={() => {
                        setSelectedMaterialId(lst.id);
                        setActiveTab('material-detail');
                      }} 
                      className="btn-secondary w-full"
                    >
                      Inspect Specifications
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedMaterialId(lst.id);
                        setActiveTab('material-detail');
                      }}
                      className="btn-primary"
                    >
                      Bid
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filter Side Drawer */}
      {showFilterDrawer && (
        <div className="filter-drawer glass-overlay">
          <div className="drawer-panel glass">
            <div className="drawer-header">
              <h3 className="font-display">Refine Material Stream</h3>
              <button onClick={() => setShowFilterDrawer(false)} className="close-drawer-btn">
                <X size={20} />
              </button>
            </div>
            <div className="drawer-body">
              <div className="drawer-filter-section">
                <h4>Proximity Radius</h4>
                <select className="drawer-input">
                  <option>Within 50 miles</option>
                  <option>Within 150 miles</option>
                  <option>Within 500 miles</option>
                  <option>Nationwide</option>
                </select>
              </div>

              <div className="drawer-filter-section">
                <h4>Minimum Purity</h4>
                <select className="drawer-input">
                  <option>99% + Purity</option>
                  <option>95% + Purity</option>
                  <option>90% + Purity</option>
                  <option>Any grade</option>
                </select>
              </div>

              <div className="drawer-filter-section">
                <h4>Trade Logistics Channels</h4>
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked /> Rail Spurs Adjacent
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" defaultChecked /> Water Barge Terminals
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" /> Flatbed Truck Ready
                </label>
              </div>

              <button onClick={() => setShowFilterDrawer(false)} className="btn-primary w-full" style={{ marginTop: '24px' }}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Material Listing Modal overlay */}
      {showCreateForm && (
        <div className="filter-drawer glass-overlay">
          <div className="drawer-panel glass list-material-modal">
            <div className="drawer-header">
              <h3 className="font-display">New Material Exchange Stream</h3>
              <button onClick={() => setShowCreateForm(false)} className="close-drawer-btn">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateListing} className="drawer-body">
              <div className="drawer-filter-section">
                <label>Material Stream Title</label>
                <input 
                  type="text" 
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Post-Industrial Polypropylene Flakes" 
                  className="drawer-input" 
                  required 
                />
              </div>

              <div className="drawer-filter-section">
                <label>Category</label>
                <select 
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="drawer-input"
                >
                  <option>Polymers</option>
                  <option>Metals</option>
                  <option>Battery Materials</option>
                  <option>Minerals & Slag</option>
                  <option>Organics</option>
                </select>
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '12px' }}>
                <div className="drawer-filter-section" style={{ flex: 1 }}>
                  <label>Quantity (Tons)</label>
                  <input 
                    type="number" 
                    value={formQuantity}
                    onChange={(e) => setFormQuantity(e.target.value)}
                    placeholder="e.g. 50" 
                    className="drawer-input" 
                    required 
                  />
                </div>
                <div className="drawer-filter-section" style={{ flex: 1 }}>
                  <label>Purity (%)</label>
                  <input 
                    type="text" 
                    value={formPurity}
                    onChange={(e) => setFormPurity(e.target.value)}
                    placeholder="e.g. 98.2%" 
                    className="drawer-input" 
                  />
                </div>
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '12px' }}>
                <div className="drawer-filter-section" style={{ flex: 1 }}>
                  <label>Target Price ($/Ton)</label>
                  <input 
                    type="number" 
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 650" 
                    className="drawer-input" 
                    required 
                  />
                </div>
                <div className="drawer-filter-section" style={{ flex: 1 }}>
                  <label>Location (City, State)</label>
                  <input 
                    type="text" 
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="e.g. Detroit, MI" 
                    className="drawer-input" 
                    required 
                  />
                </div>
              </div>

              <div className="drawer-filter-section">
                <label>Chemical & Physical Specifications</label>
                <textarea 
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Provide mechanical grades, thermal specs, heavy metal contamination details, packaging format..." 
                  className="drawer-input"
                  style={{ height: '80px' }}
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full" style={{ marginTop: '16px' }}>
                Verify & Broadcast Listing
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
