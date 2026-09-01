'use client';

import React, { useState, useEffect } from 'react';

export default function DirectorDashboard() {
  const [mounted, setMounted] = useState(false);
  const [rainDrops, setRainDrops] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setMounted(true);
    const drops = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${0.5 + Math.random() * 0.5}s`,
      animationDelay: `${Math.random() * 1}s`
    }));
    setRainDrops(drops);
  }, []);

  const [voiceQuery, setVoiceQuery] = useState('');
  const [activeTab, setActiveTab] = useState('command');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [telegramAlertSent, setTelegramAlertSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive states for charts, tabs, and accordions
  const [consolidatedTab, setConsolidatedTab] = useState<'financial' | 'boq'>('financial');
  const [openZone, setOpenZone] = useState<string | null>('North Zone');
  const [openSiteId, setOpenSiteId] = useState<number | null>(null);
  const [aiPopupSite, setAiPopupSite] = useState<any | null>(null);
  
  // Interactive Modals State
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [brainstormInput, setBrainstormInput] = useState('');

  // Departmental Approvals State
  const [departmentApprovals, setDepartmentApprovals] = useState([
    {
      id: 'tendering',
      dept: 'Tendering & Bids',
      count: 3,
      items: [
        { id: 't1', title: 'Pune-Nashik Greenfield Bid Bond Release', sub: 'Urgent Bank Guarantee sign-off' },
        { id: 't2', title: 'Kolhapur Expressway Pre-qualification Document', sub: 'Review technical annexures' },
        { id: 't3', title: 'NHAI Package 4 Tender Fee Exemption', sub: 'Verification required' }
      ]
    },
    {
      id: 'fleet',
      dept: 'Fleet and Fuel',
      count: 1,
      items: [
        { id: 'f1', title: 'Bulk Diesel Fuel Purchase Order #412', sub: 'Kolhapur Yard storage tank capacity check' }
      ]
    },
    {
      id: 'purchase',
      dept: 'Purchase & Procurement',
      count: 2,
      items: [
        { id: 'p1', title: 'VG-30 Bitumen Procurement Contract', sub: 'Rate negotiation completed' },
        { id: 'p2', title: 'OPC Cement Grade 53 Quarterly Supply', sub: 'Supplier agreement renewal' }
      ]
    },
    {
      id: 'finance',
      dept: 'Vendor & Finance',
      count: 0,
      items: []
    },
    {
      id: 'accounts',
      dept: 'Accounts & Audit',
      count: 4,
      items: [
        { id: 'a1', title: 'RA Bill #15 Tax Deductions Audit', sub: 'GST compliance verification' },
        { id: 'a2', title: 'Subcontractor Payroll Disbursement', sub: 'Expressway Sec IV workforce' },
        { id: 'a3', title: 'Machinery Depreciation Ledger Sign-off', sub: 'Q2 Financial closing' },
        { id: 'a4', title: 'Toll Plaza Revenue Reconciliation', sub: 'Monthly variance check' }
      ]
    },
    {
      id: 'safety',
      dept: 'Safety and Compliance',
      count: 1,
      items: [
        { id: 's1', title: 'Expressway Sec IV Safety Gear Audit', sub: 'High-visibility jacket compliance report' }
      ]
    },
    {
      id: 'it',
      dept: 'IT & IoT Systems',
      count: 0,
      items: []
    }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExcelExport = (siteName: string) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `Site Name,${siteName}\n`
      + "Export Date,2026-09-01\n"
      + "Status,Active Telemetry\n";
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${siteName.replace(/\s+/g, '_')}_Detailed_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerToast(`Successfully downloaded detailed Excel report for ${siteName}!`);
  };

  const handleScheduleMeeting = (siteName: string) => {
    triggerToast(`📅 Calendar sync invitation sent to ${siteName} team!`);
  };

  const IconOutlined = {
    lightning: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    ),
    clipboard: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
    ),
    ruler: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h10M4 14h16M4 18h8"/></svg>
    ),
    truck: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"/></svg>
    ),
    fuel: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
    ),
    box: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
    ),
    worker: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
    ),
    user: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
    ),
    card: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
    ),
    mapPin: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    ),
    shield: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
    ),
    chart: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
    ),
    mic: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
    ),
    bell: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
    ),
    cctv: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
    ),
    map: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
    ),
    calendar: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    ),
    thumbUp: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/></svg>
    ),
    sos: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
    )
  };

  const menuItems = [
    { id: 'command', name: 'Command Centre', icon: IconOutlined.lightning },
    { id: 'tendering', name: 'Tendering', icon: IconOutlined.clipboard },
    { id: 'engineering', name: 'Engineering', icon: IconOutlined.ruler },
    { id: 'fleet', name: 'Fleet and Machinery', icon: IconOutlined.truck },
    { id: 'fuel', name: 'Fuel', icon: IconOutlined.fuel },
    { id: 'material', name: 'Material and Inventory', icon: IconOutlined.box },
    { id: 'workforce', name: 'Workforce and HR', icon: IconOutlined.worker },
    { id: 'ess', name: 'ESS', icon: IconOutlined.user },
    { id: 'vendor', name: 'Vendor and Finance', icon: IconOutlined.card },
    { id: 'project', name: 'Project and Quality', icon: IconOutlined.mapPin },
    { id: 'safety', name: 'Safety and Compliance', icon: IconOutlined.shield },
    { id: 'reporting', name: 'Reporting', icon: IconOutlined.chart },
  ];

  const allSites = [
    {
      id: 1,
      zone: "South Zone",
      name: "NH-66 Greenfield Bypass",
      type: "Package 2 • National Highway",
      status: "On Track",
      statusBadgeColor: "bg-emerald-500 text-white",
      statusClass: isDarkMode ? "bg-emerald-950/60 text-emerald-400" : "bg-[#e6f4ea] text-[#137333]",
      progress: 76,
      boqProgress: 82,
      budget: "₹240.0 Cr",
      startDate: "Jan 2024",
      endDate: "Mar 2027",
      expenditure: "₹184.0 Cr",
      billed: "₹162.0 Cr",
      unbilled: "₹22.0 Cr",
      aiRecommendation: "Expedite pending JMR sign-off with NHAI Director to unlock ₹22 Cr unbilled cashflow.",
      location: "Kolhapur-Goa Highway Section, NH-66 Chainage 42",
      contacts: { pm: "Rahul Deshmukh (+91 98231 44551)" }
    },
    {
      id: 2,
      zone: "South Zone",
      name: "SH-12 Ring Road Expansion",
      type: "State Highway Corridor",
      status: "Moderate Risk",
      statusBadgeColor: "bg-amber-500 text-white",
      statusClass: isDarkMode ? "bg-amber-950/60 text-amber-400" : "bg-[#fef7e0] text-[#b06000]",
      progress: 61,
      boqProgress: 58,
      budget: "₹150.0 Cr",
      startDate: "May 2024",
      endDate: "Jun 2027",
      expenditure: "₹92.0 Cr",
      billed: "₹83.0 Cr",
      unbilled: "₹9.0 Cr",
      aiRecommendation: "Deploy 2 additional excavators to Sector 3 to clear drainage blockage and stabilize sub-base before heavy rain.",
      location: "Kolhapur Ring Road Outer Corridor, Sector 3",
      contacts: { pm: "Sameer Joshi (+91 98221 33441)" }
    },
    {
      id: 3,
      zone: "North Zone",
      name: "Expressway Flyover Sec IV",
      type: "Urban Elevated Structure",
      status: "On Track",
      statusBadgeColor: "bg-emerald-500 text-white",
      statusClass: isDarkMode ? "bg-emerald-950/60 text-emerald-400" : "bg-[#e6f4ea] text-[#137333]",
      progress: 29,
      boqProgress: 35,
      budget: "₹120.0 Cr",
      startDate: "Aug 2024",
      endDate: "Dec 2027",
      expenditure: "₹35.0 Cr",
      billed: "₹30.2 Cr",
      unbilled: "₹4.8 Cr",
      aiRecommendation: "Shift 3 idle excavators from NH-66 yard to accelerate pier foundation casting speed.",
      location: "Expressway Intersection IV, Kolhapur",
      contacts: { pm: "Vikram Kadam (+91 98111 22331)" }
    },
    {
      id: 4,
      zone: "North Zone",
      name: "Mumbai-Nashik Expressway Corridor",
      type: "High-Speed Freight Corridor",
      status: "Critical Loss",
      statusBadgeColor: "bg-red-600 text-white",
      statusClass: isDarkMode ? "bg-red-950/60 text-red-400" : "bg-red-100 text-red-800",
      progress: 48,
      boqProgress: 50,
      budget: "₹180.0 Cr",
      startDate: "Feb 2024",
      endDate: "Jan 2028",
      expenditure: "₹95.0 Cr",
      billed: "₹88.0 Cr",
      unbilled: "₹7.0 Cr",
      aiRecommendation: "Authorize overnight slope stabilization contractor shift to prevent monsoon schedule slippage.",
      location: "Nashik Ghat Section Sector 7",
      contacts: { pm: "Nilesh Kulkarni (+91 98222 11223)" }
    }
  ];

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'bg-[#121212] text-gray-100' : 'bg-[#f4f6f9] text-[#1e1e1e]'} selection:bg-[#af2024] selection:text-white transition-colors duration-300`} style={{ fontFamily: "'Inter', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes continuous-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes android-fade-in { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes android-slide-right { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes rainfall { 0% { transform: translateY(-20px); opacity: 0; } 50% { opacity: 0.8; } 100% { transform: translateY(180px); opacity: 0; } }
        @keyframes chart-draw { from { stroke-dasharray: 0 1000; } to { stroke-dasharray: 1000 0; } }

        .animate-marquee { display: inline-block; animation: marquee 25s linear infinite; }
        .animate-spin-badge { animation: continuous-spin 6s linear infinite; }
        .animate-chart { animation: chart-draw 1.4s cubic-bezier(0.1, 0.9, 0.2, 1) forwards; }
        .android-card-transition { transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .android-card-transition:hover { transform: translateY(-3px); box-shadow: 0 12px 30px -10px rgba(0,0,0,0.12); }
        .android-modal-enter { animation: android-fade-in 0.25s cubic-bezier(0.1, 0.9, 0.2, 1) forwards; }
        .android-slide-enter { animation: android-slide-right 0.3s cubic-bezier(0.1, 0.9, 0.2, 1) forwards; }
        .rain-drop { position: absolute; background: linear-gradient(transparent, rgba(56, 189, 248, 0.8)); width: 1.5px; height: 16px; opacity: 0.7; animation: rainfall linear infinite; }

        .glass-button {
          background: ${isDarkMode ? 'rgba(30, 30, 30, 0.75)' : 'rgba(255, 255, 255, 0.65)'};
          backdrop-filter: blur(12px);
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(200, 205, 215, 0.6)'};
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
          transition: all 0.2s ease;
        }
        .glass-button:hover {
          background: ${isDarkMode ? 'rgba(45, 45, 45, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
          border-color: ${isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(130, 140, 160, 0.8)'};
          transform: translateY(-1px);
        }

        .glass-progress {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.05)'};
          backdrop-filter: blur(8px);
          border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'};
        }

        .hover-actions { opacity: 0; pointer-events: none; transition: opacity 0.2s ease, transform 0.2s ease; transform: translateY(4px); }
        .group:hover .hover-actions { opacity: 1; pointer-events: auto; transform: translateY(0); }

        .animated-gradient-border-profitable {
          background: linear-gradient(60deg, #137333, #ffffff, #34a853, #ffffff, #137333);
          background-size: 300% 300%; animation: gradient-border-flow 6s ease infinite; padding: 1px;
        }
        .animated-gradient-border-moderate {
          background: linear-gradient(60deg, #b06000, #ffffff, #f59e0b, #ffffff, #b06000);
          background-size: 300% 300%; animation: gradient-border-flow 6s ease infinite; padding: 1px;
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e1e1e] text-white px-5 py-3.5 rounded-2xl shadow-2xl text-[14px] font-semibold border border-white/10 android-modal-enter flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#af2024] animate-ping"></span>
          {toastMessage}
        </div>
      )}

      {/* AI Action Popup Modal */}
      {aiPopupSite && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all">
          <div className={`${isDarkMode ? 'bg-[#1e1e1e] text-white border-white/10' : 'bg-white text-gray-900 border-gray-100'} rounded-[28px] max-w-lg w-full p-7 shadow-2xl android-modal-enter border`}>
            <div className={`flex justify-between items-center pb-4 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
              <h3 className="text-[18px] font-bold flex items-center gap-2.5">
                <span className="text-[#af2024] p-2 bg-[#fce8e6] rounded-xl">🤖</span> AI Recommended Action: {aiPopupSite.name}
              </h3>
              <button onClick={() => setAiPopupSite(null)} className="w-9 h-9 rounded-full glass-button font-semibold cursor-pointer transition flex items-center justify-center">✕</button>
            </div>
            <div className="my-6">
              <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-[#252525] border-white/5' : 'bg-gray-50 border-gray-200/80'} border mb-4`}>
                <div className="text-[12px] font-bold text-[#af2024] uppercase tracking-wider mb-1">Recommended Telemetry Optimization</div>
                <p className="text-[14.5px] leading-relaxed font-medium">{aiPopupSite.aiRecommendation}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => { triggerToast(`Successfully executed AI directive for ${aiPopupSite.name}!`); setAiPopupSite(null); }} className="flex-1 py-3 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-semibold text-[14px] cursor-pointer transition shadow-lg shadow-[#af2024]/20">
                Take Action ⚡
              </button>
              <button onClick={() => setAiPopupSite(null)} className="px-5 py-3 glass-button rounded-2xl font-semibold text-[14px] cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all">
          <div className={`${isDarkMode ? 'bg-[#1e1e1e] text-white border-white/10' : 'bg-white text-gray-900 border-gray-100'} rounded-[28px] max-w-xl w-full p-7 shadow-2xl android-modal-enter border`}>
            <div className={`flex justify-between items-center pb-4 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
              <h3 className="text-[18px] font-bold flex items-center gap-2.5">
                <span className="text-[#af2024] p-2 bg-[#fce8e6] rounded-xl">{IconOutlined.calendar}</span> Executive Schedule & Calendar
              </h3>
              <button onClick={() => setShowCalendarModal(false)} className="w-9 h-9 rounded-full glass-button font-semibold cursor-pointer transition flex items-center justify-center">✕</button>
            </div>
            <div className="my-5 flex flex-col gap-3">
              <div className={`p-4 ${isDarkMode ? 'bg-[#252525] border-white/10' : 'bg-gray-50 border-gray-200/80'} border rounded-2xl flex justify-between items-center`}>
                <div>
                  <div className="font-bold">11:00 AM - Board Meeting</div>
                  <div className={`text-[12.5px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Kolhapur HQ Boardroom • Strategy & Cashflow Review</div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-[11px] rounded-full">Confirmed</span>
              </div>
            </div>
            <button onClick={() => setShowCalendarModal(false)} className="w-full py-3 glass-button rounded-2xl font-semibold text-[14px] cursor-pointer">Close</button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfileMenu && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-6 pt-20" onClick={() => setShowProfileMenu(false)}>
          <div className={`${isDarkMode ? 'bg-[#1e1e1e] text-white border-white/10' : 'bg-white text-gray-900 border-gray-100'} rounded-[24px] w-72 shadow-2xl border p-4 flex flex-col gap-2 android-modal-enter`} onClick={(e) => e.stopPropagation()}>
            <div className={`pb-3.5 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'} flex items-center gap-3`}>
              <span className="p-2 bg-[#fce8e6] text-[#af2024] rounded-xl">{IconOutlined.user}</span>
              <div>
                <div className="font-semibold text-[15px]">Sushant (Director)</div>
                <div className="text-[12px] opacity-60 font-normal">sushant@mdinfra.com</div>
              </div>
            </div>
            <button onClick={() => { setShowProfileMenu(false); triggerToast("Logged out successfully"); }} className="w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-[#af2024] transition flex items-center gap-3">
              🚪 Logout Session
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs transition-opacity" />
      )}

      {/* Left Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 ${isDarkMode ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-200/70'} border-r flex flex-col justify-between p-4 shrink-0 transition-all duration-300 shadow-sm
        ${isSidebarCollapsed ? 'md:w-[80px]' : 'md:w-[280px]'}
        ${isMobileMenuOpen ? 'w-[280px] translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          <div className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
            {(!isSidebarCollapsed || isMobileMenuOpen) && (
              <div className="flex items-center gap-2.5 overflow-hidden android-slide-enter">
                <img src="/logo.png" alt="MD Infra Logo" className="w-52 h-auto object-contain rounded" />
              </div>
            )}
            <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden w-8 h-8 rounded-xl glass-button flex items-center justify-center font-bold">✕</button>
          </div>

          {(!isSidebarCollapsed || isMobileMenuOpen) && (
            <div className="text-[11px] text-gray-400 mt-4 mb-2 font-bold uppercase tracking-wider px-2">Workspace Modules</div>
          )}
          
          <ul className="flex flex-col gap-1.5 mt-2 overflow-y-auto max-h-[calc(100vh-230px)] pr-1">
            {menuItems.map((item) => (
              <li 
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSelectedSite(null); setIsMobileMenuOpen(false); triggerToast(`Mapsd to ${item.name} Module`); }}
                className={`flex items-center gap-3.5 p-3 rounded-2xl text-[14px] font-semibold cursor-pointer transition-all ${activeTab === item.id && !selectedSite ? 'bg-[#af2024] text-white shadow-lg shadow-[#af2024]/20 scale-[1.02]' : isDarkMode ? 'text-gray-300 hover:bg-white/5 hover:text-[#af2024]' : 'text-gray-600 hover:bg-gray-50 hover:text-[#af2024]'}`}
                title={isSidebarCollapsed && !isMobileMenuOpen ? item.name : ''}
              >
                <span className="text-[17px] shrink-0 font-light opacity-90">{item.icon}</span>
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">{item.name}</span>}
              </li>
            ))}
          </ul>
        </div>

        {/* Real Light / Dark Mode Toggle */}
        <div className={`border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'} pt-3 mt-2 flex flex-col gap-3`}>
          <div className={`flex items-center justify-between p-2 rounded-2xl ${isDarkMode ? 'bg-[#222]' : 'bg-gray-50'}`}>
            {(!isSidebarCollapsed || isMobileMenuOpen) && (
              <span className="text-[13px] font-semibold flex items-center gap-2">
                <span>{isDarkMode ? '🌙' : '☀️'}</span> {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            )}
            <button 
              onClick={() => { setIsDarkMode(!isDarkMode); triggerToast(isDarkMode ? "Switched to Light Mode" : "Switched to Dark Mode"); }}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${isDarkMode ? 'bg-[#af2024]' : 'bg-gray-300'}`}
              title="Toggle Dark/Light Mode"
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          {(!isSidebarCollapsed || isMobileMenuOpen) && (
            <div className="text-[11.5px] text-gray-400 font-medium px-1">MDI Private Limited • Kolhapur HQ</div>
          )}
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-y-auto relative w-full">
        {/* Marquee Tenders News */}
        <div className="bg-[#af2024] text-white text-[13px] font-semibold py-3 px-6 flex items-center overflow-hidden shrink-0 shadow-md gap-4">
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="hidden md:flex glass-button text-white font-semibold px-3.5 py-1.5 rounded-full text-[11px] shrink-0 border border-white/30 items-center gap-1.5 shadow-sm cursor-pointer">
            <span>{isSidebarCollapsed ? '📂 Open Menu' : '📁 Collapse Menu'}</span>
          </button>
          <span className="bg-white/15 text-white font-semibold px-3 py-1 rounded-full text-[11px] shrink-0 border border-white/20 hidden sm:flex items-center gap-1.5 shadow-sm">
            {IconOutlined.clipboard} GOV TENDERS TICKER
          </span>
          <div className="w-full overflow-hidden whitespace-nowrap">
            <div className="animate-marquee inline-flex gap-16 font-normal cursor-pointer">
              <span onClick={() => window.open('https://etenders.gov.in', '_blank')} className="hover:underline">
                ⚡ NHAI releases <b>₹450 Cr</b> EPC Tender for Pune-Nashik Greenfield Corridor (Deadline: Sept 20) → Click to view eProcure
              </span>
            </div>
          </div>
        </div>

        <header className={`${isDarkMode ? 'bg-[#181818]/80 border-white/10' : 'bg-white/80 border-gray-200/70'} backdrop-blur-md px-4 sm:px-8 py-4 border-b flex justify-between items-center sticky top-0 z-10 shadow-xs gap-3`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2.5 rounded-2xl glass-button transition">☰</button>
            <div>
              <h2 className={`text-[18px] sm:text-[22px] font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#1e1e1e]'}`}>Sushant's Command Centre</h2>
              <p className="text-[12px] sm:text-[13px] text-gray-400 font-normal mt-0.5 hidden sm:block">Live Interactive Enterprise ERP Environment</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className={`hidden lg:flex items-center ${isDarkMode ? 'bg-[#222] border-white/10' : 'bg-gray-50 border-gray-200/80'} border rounded-2xl px-3.5 py-2 w-64 xl:w-72 gap-2.5 transition`}>
              <input type="text" value={voiceQuery} onChange={(e) => setVoiceQuery(e.target.value)} placeholder="Dispatch command..." className="border-none bg-transparent outline-none text-[13.5px] font-normal w-full placeholder-gray-400" />
            </div>
            <div onClick={() => setShowCalendarModal(true)} className="relative glass-button px-3.5 sm:px-4 py-2.5 rounded-2xl cursor-pointer font-semibold text-[13px] transition flex items-center gap-2">
              <span>📅 Schedule</span>
            </div>
            <div onClick={() => setShowProfileMenu(!showProfileMenu)} className={`flex items-center gap-3 cursor-pointer p-1.5 rounded-2xl transition border ${isDarkMode ? 'hover:bg-white/5 border-transparent hover:border-white/10' : 'hover:bg-gray-50 border-transparent hover:border-gray-200'}`}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#af2024] text-white flex items-center justify-center font-bold text-[14px] shadow-md shadow-[#af2024]/20">SU</div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8 flex flex-col gap-6 android-slide-enter">
          {selectedSite ? (
            <div className="flex flex-col gap-6 android-slide-enter">
              <div className={`flex flex-col md:flex-row justify-between items-start md:items-center ${isDarkMode ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-200/80'} border rounded-[24px] p-5 shadow-sm gap-4`}>
                <button onClick={() => setSelectedSite(null)} className="px-4.5 py-2.5 glass-button rounded-2xl font-semibold text-[13.5px] cursor-pointer transition">← Back to Command Centre</button>
                <div className="text-left md:text-right">
                  <h2 className="text-[19px] font-bold">{selectedSite.name}</h2>
                  <p className="text-[12px] text-gray-400 font-medium">{selectedSite.type} • {selectedSite.location}</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button onClick={() => handleScheduleMeeting(selectedSite.name)} className="px-4.5 py-2.5 glass-button rounded-2xl text-[13.5px] font-bold cursor-pointer transition">📅 Schedule Meeting</button>
                  <button onClick={() => handleExcelExport(selectedSite.name)} className="px-4.5 py-2.5 bg-[#137333] hover:bg-[#0d5023] text-white rounded-2xl text-[13.5px] font-semibold cursor-pointer transition">📊 Export Report</button>
                </div>
              </div>
            </div>
          ) : (
            activeTab === 'command' && (
              <div className="flex flex-col gap-6 android-slide-enter">
                
                {/* Executive Morning Briefing & Weather */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#1e1e1e] to-gray-900 text-white rounded-[28px] p-7 flex flex-col justify-between shadow-xl android-card-transition relative overflow-hidden">
                    <div>
                      <div className="text-[12px] font-bold opacity-60 uppercase tracking-widest">Executive Morning Briefing</div>
                      <h1 className="text-[26px] sm:text-[30px] font-bold mt-1.5 tracking-tight">Hello, good morning, Sushant.</h1>
                      <p className="text-[14px] opacity-85 font-normal mt-2 leading-relaxed">All strategic sites mobilized. Operations running at <b>94.6%</b> efficiency.</p>
                    </div>
                    <div className="mt-6 pt-5 border-t border-white/15 flex justify-between text-[13px] font-medium opacity-90">
                      <span>📍 Kolhapur Site Headquarters</span>
                      <span>🕒 Sept 1, 2026 • 12:21 PM</span>
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-200/80'} border rounded-[28px] p-7 flex flex-col justify-between shadow-sm android-card-transition relative overflow-hidden`}>
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                      {mounted && rainDrops.map((drop) => (
                        <span key={drop.id} className="rain-drop" style={{ left: drop.left, animationDuration: drop.animationDuration, animationDelay: drop.animationDelay }} />
                      ))}
                    </div>
                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <div className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider">Weather Intelligence • Kolhapur</div>
                        <div className="text-[20px] sm:text-[23px] font-bold mt-1.5"><b>29°C</b> · Heavy Rain Expected at <b>4:30 PM</b></div>
                      </div>
                      <div className="text-[36px] bg-sky-50 p-3 rounded-2xl shadow-inner relative">🌧️</div>
                    </div>
                    <div className="bg-[#fef7e0] border border-[#f59e0b]/30 p-4 rounded-2xl flex items-center justify-between mt-4 gap-3 relative z-10 text-amber-900">
                      <span className="text-[13px] font-semibold">⚠️ Rain Alert: Protect open sub-base layers immediately.</span>
                      <button onClick={() => { setTelegramAlertSent(true); triggerToast("Telegram alert dispatched!"); }} className="px-4 py-2 bg-[#af2024] text-white rounded-xl text-[12.5px] font-semibold">
                        {telegramAlertSent ? "✓ Sent!" : "Make Arrangements"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* ==========================================
                    1. CONSOLIDATED DASHBOARD WITH PLAIN PIE-CHART, PERCENTAGES INSIDE, AND SITE STATUS LIST
                   ========================================== */}
                <div className={`${isDarkMode ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-200/80'} border rounded-[28px] p-8 shadow-sm android-card-transition`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <h3 className="text-[19px] font-bold flex items-center gap-2.5">
                      <span>📈</span> Consolidated Enterprise Financial & Expense Dashboard
                    </h3>
                    <div className={`flex p-1.5 rounded-2xl ${isDarkMode ? 'bg-[#222]' : 'bg-gray-100'}`}>
                      <button 
                        onClick={() => setConsolidatedTab('financial')}
                        className={`px-6 py-2.5 rounded-xl text-[14px] font-bold transition cursor-pointer ${consolidatedTab === 'financial' ? 'bg-[#af2024] text-white shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
                      >
                        Financial Report
                      </button>
                      <button 
                        onClick={() => setConsolidatedTab('boq')}
                        className={`px-6 py-2.5 rounded-xl text-[14px] font-bold transition cursor-pointer ${consolidatedTab === 'boq' ? 'bg-[#af2024] text-white shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
                      >
                        BOQ Report
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Metrics column with verified legibility (including Total Billed) */}
                    <div className="lg:col-span-4 flex flex-col gap-4">
                      {consolidatedTab === 'financial' ? (
                        <>
                          <div className="p-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl flex justify-between items-center shadow-xs">
                            <div><span className="text-[12px] text-gray-500 font-bold uppercase">Total Project Cost</span><div className="text-2xl font-extrabold text-[#af2024] mt-0.5">₹510.0 Cr</div></div>
                            <span className="w-4 h-4 rounded-full bg-[#af2024] shadow-sm"></span>
                          </div>
                          <div className="p-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl flex justify-between items-center shadow-xs">
                            <div><span className="text-[12px] text-gray-500 font-bold uppercase">Expenditure Date</span><div className="text-2xl font-extrabold text-[#b06000] mt-0.5">₹415.0 Cr</div></div>
                            <span className="w-4 h-4 rounded-full bg-[#b06000] shadow-sm"></span>
                          </div>
                          <div className="p-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl flex justify-between items-center shadow-xs">
                            <div><span className="text-[12px] text-gray-500 font-bold uppercase">Unbilled Amount</span><div className="text-2xl font-extrabold text-amber-600 mt-0.5">₹42.8 Cr</div></div>
                            <span className="w-4 h-4 rounded-full bg-amber-500 shadow-sm"></span>
                          </div>
                          <div className="p-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl flex justify-between items-center shadow-xs">
                            <div><span className="text-[12px] text-gray-500 font-bold uppercase">Total Billed Amount</span><div className="text-2xl font-extrabold text-[#137333] mt-0.5">₹363.2 Cr</div></div>
                            <span className="w-4 h-4 rounded-full bg-[#137333] shadow-sm"></span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="p-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl flex justify-between items-center shadow-xs">
                            <div><span className="text-[12px] text-gray-500 font-bold uppercase">Earthwork & Embankment</span><div className="text-2xl font-extrabold text-[#137333] mt-0.5">88% Done</div></div>
                          </div>
                          <div className="p-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl flex justify-between items-center shadow-xs">
                            <div><span className="text-[12px] text-gray-500 font-bold uppercase">Structures & Piling</span><div className="text-2xl font-extrabold text-sky-600 mt-0.5">74% Done</div></div>
                          </div>
                          <div className="p-4 bg-gray-50/50 border border-gray-200/60 rounded-2xl flex justify-between items-center shadow-xs">
                            <div><span className="text-[12px] text-gray-500 font-bold uppercase">Bituminous Paving DBM/BC</span><div className="text-2xl font-extrabold text-[#b06000] mt-0.5">62% Done</div></div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Plain, Uncropped Pie Chart with Percentage Written Inside */}
                    <div className="lg:col-span-4 flex justify-center items-center relative py-6">
                      <div className="relative p-3 rounded-full">
                        <svg className="w-72 h-72 transform -rotate-90 animate-chart overflow-visible" viewBox="0 0 36 36">
                          <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke={isDarkMode ? '#252525' : '#e2e8f0'} strokeWidth="5"></circle>
                          {consolidatedTab === 'financial' ? (
                            <>
                              <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#10b981" strokeWidth="5" strokeDasharray="50 50" strokeDashoffset="0"></circle>
                              <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#f59e0b" strokeWidth="5" strokeDasharray="30 70" strokeDashoffset="-50"></circle>
                              <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#3b82f6" strokeWidth="5" strokeDasharray="10 90" strokeDashoffset="-80"></circle>
                              <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#ef4444" strokeWidth="5" strokeDasharray="10 90" strokeDashoffset="-90"></circle>
                            </>
                          ) : (
                            <>
                              <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#10b981" strokeWidth="5" strokeDasharray="45 55" strokeDashoffset="0"></circle>
                              <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#0284c7" strokeWidth="5" strokeDasharray="30 70" strokeDashoffset="-45"></circle>
                              <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#f59e0b" strokeWidth="5" strokeDasharray="25 75" strokeDashoffset="-75"></circle>
                            </>
                          )}
                        </svg>

                        {/* Percentage written inside the plain pie chart */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                          <span className="text-3xl font-black tracking-tight">{consolidatedTab === 'financial' ? '50%' : '45%'}</span>
                          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{consolidatedTab === 'financial' ? 'Billed Share' : 'Earthwork'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Site Status List (Replacing Map) */}
                    <div className={`lg:col-span-4 rounded-2xl p-6 flex flex-col justify-between ${isDarkMode ? 'bg-[#222]/80 border-white/5' : 'bg-gray-50 border-gray-200/60'} border h-80 overflow-y-auto shadow-inner`}>
                      <div className="text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-4">
                        🏢 Strategic Sites Status ({consolidatedTab === 'financial' ? 'Profitability' : 'BOQ Progress'})
                      </div>
                      <div className="flex flex-col gap-3">
                        {allSites.map((site) => (
                          <div 
                            key={site.id}
                            onClick={() => setSelectedSite(site)}
                            className={`p-3.5 rounded-xl ${isDarkMode ? 'bg-[#1a1a1a] hover:bg-[#2a2a2a]' : 'bg-white hover:bg-gray-100'} border border-gray-200/50 flex items-center justify-between cursor-pointer transition shadow-xs`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-4 h-4 rounded-full shadow-sm shrink-0" style={{ backgroundColor: site.riskColor }}></span>
                              <span className={`font-extrabold text-[14px] ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{site.name}</span>
                            </div>
                            <span className={`px-2.5 py-1 rounded-md text-[11.5px] font-extrabold ${site.statusBadgeColor}`}>
                              {site.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* ==========================================
                    2. ZONE-WISE STRATEGIC HUB (VERTICAL ACCORDIONS WITH ENLARGED NUMBERS & HIGH-CONTRAST NAMES)
                   ========================================== */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-[18px] font-bold flex items-center gap-2">
                    <span>📍</span> Zone-wise Strategic Hubs
                  </h3>

                  {['North Zone', 'South Zone'].map((zoneName) => {
                    const isZoneOpen = openZone === zoneName;
                    const zoneSites = allSites.filter(s => s.zone === zoneName);

                    return (
                      <div key={zoneName} className={`animated-gradient-border-${zoneName === 'South Zone' ? 'profitable' : 'moderate'} rounded-[28px] shadow-sm`}>
                        <div className={`${isDarkMode ? 'bg-[#181818]' : 'bg-white'} rounded-[27px] p-6`}>
                          
                          {/* Zone Accordion Header */}
                          <div onClick={() => setOpenZone(isZoneOpen ? null : zoneName)} className="flex justify-between items-center cursor-pointer pb-2">
                            <h4 className="text-[18px] font-bold flex items-center gap-2.5">
                              <span>🌐</span> {zoneName} Hub ({zoneSites.length} Sites Active)
                            </h4>
                            <span className="text-xl font-bold text-gray-400">{isZoneOpen ? '▲' : '▼'}</span>
                          </div>

                          {/* Zone Content */}
                          {isZoneOpen && (
                            <div className="mt-5 flex flex-col gap-4 animate-fadeIn">
                              {zoneSites.map((site) => {
                                const isSiteOpen = openSiteId === site.id;

                                return (
                                  <div key={site.id} className={`p-5 ${isDarkMode ? 'bg-[#222] border-white/5' : 'bg-gray-50 border-gray-200/70'} border rounded-2xl flex flex-col gap-4 shadow-xs`}>
                                    
                                    {/* Site Brief Header with High-Contrast Bold Name */}
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                      <div className="cursor-pointer flex-1" onClick={() => setOpenSiteId(isSiteOpen ? null : site.id)}>
                                        <div className="flex items-center gap-3 flex-wrap">
                                          <span className={`font-extrabold text-lg ${isDarkMode ? 'text-white' : 'text-[#0f172a]'}`}>{site.name}</span>
                                          <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${site.statusClass}`}>{site.status}</span>
                                        </div>
                                        <div className="text-[13.5px] text-gray-400 mt-1">
                                          Cost: <b>{site.budget}</b> • Timeline: {site.startDate} to {site.endDate}
                                        </div>

                                        {/* Dual Glassmorphism Progress Bars */}
                                        <div className="flex flex-col gap-1.5 mt-3 w-full sm:w-96">
                                          <div className="flex justify-between text-[11px] font-bold text-gray-400">
                                            <span>Timeline Progress ({site.progress}%)</span>
                                            <span>BOQ Completed ({site.boqProgress}%)</span>
                                          </div>
                                          <div className="flex gap-2 w-full">
                                            <div className="flex-1 h-3 glass-progress rounded-full overflow-hidden">
                                              <div className="h-full bg-[#af2024] rounded-full" style={{ width: `${site.progress}%` }}></div>
                                            </div>
                                            <div className="flex-1 h-3 glass-progress rounded-full overflow-hidden">
                                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${site.boqProgress}%` }}></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Action Buttons */}
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <button onClick={() => setAiPopupSite(site)} className="px-3.5 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-400/30 rounded-xl text-[12.5px] font-bold transition flex items-center gap-1.5 cursor-pointer">
                                          <span>✨</span> AI Action
                                        </button>
                                        <button onClick={() => triggerToast(`🚨 SOS Initiated! Connecting with Project Manager ${site.contacts.pm}...`)} className="px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 rounded-xl text-[12.5px] font-bold transition flex items-center gap-1.5 cursor-pointer">
                                          <span>{IconOutlined.sos}</span> SOS
                                        </button>
                                        <button onClick={() => setSelectedSite(site)} className="px-4 py-2 glass-button rounded-xl text-[12.5px] font-semibold transition cursor-pointer">
                                          Check Details →
                                        </button>
                                      </div>
                                    </div>

                                    {/* Detailed Sub-Accordion Content with Enlarged Numbers */}
                                    {isSiteOpen && (
                                      <div className={`pt-4 mt-2 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200/80'} grid grid-cols-2 sm:grid-cols-4 gap-4 text-center android-slide-enter`}>
                                        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-[#181818]' : 'bg-white'} border border-gray-200/50 shadow-xs`}>
                                          <div className="text-[11.5px] text-gray-400 uppercase font-bold">Project Cost</div>
                                          <div className="text-[18px] font-extrabold text-[#af2024] mt-1">{site.budget}</div>
                                        </div>
                                        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-[#181818]' : 'bg-white'} border border-gray-200/50 shadow-xs`}>
                                          <div className="text-[11.5px] text-gray-400 uppercase font-bold">Unbilled Amount</div>
                                          <div className="text-[18px] font-extrabold text-[#b06000] mt-1">{site.unbilled}</div>
                                        </div>
                                        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-[#181818]' : 'bg-white'} border border-gray-200/50 shadow-xs`}>
                                          <div className="text-[11.5px] text-gray-400 uppercase font-bold">Total Billed</div>
                                          <div className="text-[18px] font-extrabold text-gray-900 dark:text-white mt-1">{site.billed}</div>
                                        </div>
                                        <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-[#181818]' : 'bg-white'} border border-gray-200/50 shadow-xs`}>
                                          <div className="text-[11.5px] text-gray-400 uppercase font-bold">Expenditure To Date</div>
                                          <div className="text-[18px] font-extrabold text-[#137333] mt-1">{site.expenditure}</div>
                                        </div>
                                      </div>
                                    )}

                                  </div>
                                );
                              })}
                            </div>
                          )}

                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Critical Notification Centre */}
                <div className={`${isDarkMode ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-200/80'} border rounded-[28px] p-7 shadow-sm android-card-transition`}>
                  <h3 className="text-[17px] font-bold mb-4 flex items-center gap-2.5">
                    <span className="text-[#af2024]">{IconOutlined.bell}</span> Critical Notification Centre
                  </h3>
                  <div className="p-4 bg-[#fef7e0] text-amber-900 border border-[#f59e0b]/30 rounded-2xl text-[14px] font-semibold">
                    ⚠️ NH-66 JMR Sign-off pending from NHAI Project Director (₹22 Cr value)
                  </div>
                </div>

                {/* Departmental Pending Approvals Queue */}
                <div className={`${isDarkMode ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-200/80'} border rounded-[28px] p-7 shadow-sm android-card-transition`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[18px] font-bold flex items-center gap-2.5">
                      <span className="text-[#af2024]">{IconOutlined.clipboard}</span> Departmental Pending Approvals Queue
                    </h3>
                    <span className="text-[12.5px] text-gray-400 font-semibold">Asymmetrical Executive Overview</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departmentApprovals.map(app => (
                      <div key={app.id} className={`group p-6 ${isDarkMode ? 'bg-[#222]/80 border-white/10' : 'bg-gradient-to-br from-white to-gray-50/80 border-gray-200/90'} border rounded-[24px] flex flex-col justify-between shadow-xs relative android-card-transition overflow-hidden`}>
                        <div className={`absolute top-4 right-4 w-7 h-7 ${app.count > 0 ? 'bg-[#af2024] text-white shadow-md' : isDarkMode ? 'bg-white/10 text-gray-400' : 'bg-gray-100 text-gray-500'} rounded-full flex items-center justify-center font-bold text-[12px]`}>
                          {app.count}
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">{app.dept}</div>
                          {app.count > 0 ? (
                            <div className="flex flex-col gap-3.5 my-2 pr-4">
                              {app.items.map((item, idx) => (
                                <div key={idx} className={`pb-3 ${idx < app.items.length - 1 ? `border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}` : ''}`}>
                                  <div className="font-bold text-[14px] leading-snug">{item.title}</div>
                                  <div className="text-[12px] text-gray-400 font-normal mt-0.5">{item.sub}</div>
                                  <div className="hover-actions flex items-center gap-2 mt-2.5 pt-2">
                                    <button onClick={() => triggerToast(`Approved: ${item.title}`)} className="px-2.5 py-1 bg-[#137333] hover:bg-[#0d5023] text-white rounded-lg text-[11.5px] font-bold transition flex items-center gap-1 shadow-xs">
                                      <span>{IconOutlined.thumbUp}</span> Approve
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="py-6 text-center">
                              <div className="text-[24px] mb-1 opacity-40">✨</div>
                              <div className="text-[13.5px] font-medium text-gray-400 italic">All caught up! No pending approvals.</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar, Trip Planner & Material Schedule */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div onClick={() => setShowCalendarModal(true)} className={`${isDarkMode ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-200/80'} border rounded-[28px] p-6 shadow-sm android-card-transition cursor-pointer hover:border-[#af2024]/50`}>
                    <h3 className="text-[16px] font-bold mb-4 flex items-center gap-2">
                      <span className="text-[#af2024]">{IconOutlined.calendar}</span> Executive Calendar (Click)
                    </h3>
                    <div className={`p-4 ${isDarkMode ? 'bg-[#222] border-white/5' : 'bg-gray-50 border-gray-200/80'} border rounded-2xl text-[13.5px] shadow-xs`}>
                      <div className="font-bold text-[#af2024] mb-1.5">Today: Sept 1, 2026</div>
                      <ul className="text-gray-400 font-medium flex flex-col gap-1.5">
                        <li>• 11:00 AM - Board Meeting</li>
                        <li>• 03:30 PM - SH-12 Inspection</li>
                        <li>• 06:00 PM - Tendering Review</li>
                      </ul>
                      <span className="text-[12px] text-[#af2024] font-bold mt-3 block">Click to view schedule popup →</span>
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-200/80'} border rounded-[28px] p-6 shadow-sm android-card-transition`}>
                    <h3 className="text-[16px] font-bold mb-4 flex items-center gap-2">
                      <span className="text-[#af2024]">{IconOutlined.map}</span> Trip Planner & AI Route
                    </h3>
                    <div className={`p-4 ${isDarkMode ? 'bg-[#222] border-white/5' : 'bg-gray-50 border-gray-200/80'} border rounded-2xl text-[13.5px] font-normal shadow-xs`}>
                      <div className="font-bold mb-1">HQ Kolhapur → NH-66 Site 2</div>
                      <div className="text-emerald-400 font-semibold mb-3">AI Route: Via NH48 Bypass (<b>42 mins</b>)</div>
                    </div>
                  </div>

                  <div className={`${isDarkMode ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-200/80'} border rounded-[28px] p-6 shadow-sm android-card-transition`}>
                    <h3 className="text-[16px] font-bold mb-4 flex items-center gap-2">
                      <span className="text-[#af2024]">{IconOutlined.box}</span> Scheduled Material Purchase
                    </h3>
                    <div className={`p-4 ${isDarkMode ? 'bg-[#222] border-white/5' : 'bg-gray-50 border-gray-200/80'} border rounded-2xl text-[13.5px] font-normal shadow-xs`}>
                      <div className="flex justify-between font-bold mb-2"><span>Material</span><span>Scheduled Use</span></div>
                      <div className="flex justify-between text-gray-400 py-1.5 border-b border-dashed border-gray-200 font-medium"><span>Bitumen VG-30</span><span><b>120 Metric Tons</b></span></div>
                      <div className="flex justify-between text-gray-400 pt-1.5 font-medium"><span>OPC Cement Grade 53</span><span><b>450 Bags</b></span></div>
                    </div>
                  </div>
                </div>

                {/* Work Life Balance Section */}
                <div className={`bg-gradient-to-br ${isDarkMode ? 'from-indigo-950/40 to-[#181818] border-indigo-900/40' : 'from-indigo-50 to-white border-indigo-100'} border rounded-[28px] p-7 shadow-sm android-card-transition`}>
                  <h3 className={`text-[17px] font-bold ${isDarkMode ? 'text-indigo-300' : 'text-indigo-900'} mb-4 flex items-center gap-2.5`}>
                    <span>🌟</span> Work Life Balance & Personal Milestones
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className={`p-5 ${isDarkMode ? 'bg-[#222] border-white/5' : 'bg-white border-indigo-100'} border rounded-2xl shadow-xs`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-[15px]">Ishotsav 2.0 (Annual Fest)</h4>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 font-bold text-[11px] rounded-full">Nov 1, 2026</span>
                      </div>
                      <p className="text-[13px] text-gray-400 mb-3">Countdown: <b>61 Days Left</b></p>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>

                    <div className={`p-5 ${isDarkMode ? 'bg-[#222] border-white/5' : 'bg-white border-indigo-100'} border rounded-2xl shadow-xs`}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-[15px]">Family Vacation (Goa Coastal Retreat)</h4>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-[11px] rounded-full">Dec 20, 2026</span>
                      </div>
                      <p className="text-[13px] text-gray-400 mb-3">Countdown: <b>110 Days Left</b></p>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creative Brainstorming Ideas Input Section */}
                <div className={`${isDarkMode ? 'bg-[#181818] border-white/10' : 'bg-white border-gray-200/80'} border rounded-[28px] p-7 shadow-sm android-card-transition`}>
                  <h3 className="text-[17px] font-bold mb-2 flex items-center gap-2.5">
                    <span>💡</span> Creative Brainstorming Ideas Input
                  </h3>
                  <p className="text-[13.5px] text-gray-400 mb-4">Capture unstructured strategic thoughts, innovation ideas, or process optimization notes for MDI Private Limited.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text"
                      value={brainstormInput}
                      onChange={(e) => setBrainstormInput(e.target.value)}
                      placeholder="Type a creative brainstorming thought..."
                      className={`flex-1 p-3.5 ${isDarkMode ? 'bg-[#222] border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-800'} border rounded-2xl text-[14px] outline-none transition`}
                    />
                    <button onClick={() => { if (brainstormInput.trim()) { triggerToast("💡 Brainstorm idea logged securely!"); setBrainstormInput(''); } }} className="px-6 py-3.5 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-bold text-[14px] cursor-pointer transition shadow-md shrink-0">
                      Log Idea 🚀
                    </button>
                  </div>
                </div>

              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}