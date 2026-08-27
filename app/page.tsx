'use client';

import React, { useState, useEffect } from 'react';

export default function DirectorDashboard() {
  const [mounted, setMounted] = useState(false);
  const [rainDrops, setRainDrops] = useState<any[]>([]);

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

  const [isListening, setIsListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState('');
  const [activeTab, setActiveTab] = useState('command');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [siteSlideIndex, setSiteSlideIndex] = useState(0);
  const [telegramAlertSent, setTelegramAlertSent] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBilledDetails, setShowBilledDetails] = useState(false);
  
  // Interactive Modals State
  const [activeCctv, setActiveCctv] = useState<string | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [pieHoverInfo, setPieHoverInfo] = useState<string | null>(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [brainstormInput, setBrainstormInput] = useState('');

  // Dynamic Action States
  const [activeNotificationTab, setActiveNotificationTab] = useState('right-away');
  const [notifications, setNotifications] = useState({
    'right-away': [
      { id: 1, text: '⚠️ NH-66 JMR Sign-off pending from NHAI Project Director (₹22 Cr value)', status: 'Pending' },
      { id: 2, text: '✅ Bulk Diesel Order confirmation required for Kolhapur Yard storage tank', status: 'Pending' }
    ],
    'upcoming': [
      { id: 3, text: '• Monthly safety audit scheduled across Expressway Sec IV (Due in 3 days)', status: 'Scheduled' }
    ],
    'overdue': [
      { id: 4, text: '❌ Subcontractor safety gear compliance report pending from SH-12 Site Manager', status: 'Overdue' }
    ]
  });

  const [commandRecipient, setCommandRecipient] = useState('Project Manager (NH-66)');
  const [commandText, setCommandText] = useState('');
  const [approvals, setApprovals] = useState([
    { id: 1, title: 'Vendor Payment Release - Larsen Asphalt Eq.', amount: '₹48.5 Lakhs', status: 'Pending' }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExcelExport = (siteName: string) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value\n"
      + `Site Name,${siteName}\n`
      + "Export Date,2026-08-27\n"
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
      name: "NH-66 Greenfield Bypass",
      type: "Package 2 • National Highway",
      status: "On Track",
      risk: "profitable",
      statusClass: "bg-[#e6f4ea] text-[#137333]",
      progress: 76,
      progressColor: "bg-[#137333]",
      budget: "₹240.0 Cr",
      done: "₹184.0 Cr",
      billed: "₹162.0 Cr",
      unbilled: "₹22.0 Cr",
      profit: "+₹32.4 Cr (13.5%) - Profit",
      deadline: "March 2027 (78% Timeline Elapsed)",
      location: "Kolhapur-Goa Highway Section, NH-66 Chainage 42",
      boq: {
        trucks: { actual: 45, proposed: 40 },
        tippers: { actual: 32, proposed: 35 },
        excavators: { actual: 18, proposed: 15 },
        machinery: { actual: 95, proposed: 90 },
        workforce: { actual: 420, proposed: 400 }
      },
      contacts: {
        pm: "Rahul Deshmukh (+91 98231 44551)",
        supervisor: "Sanjay Patil (+91 97654 33221)",
        billing: "Amit Kulkarni (+91 99223 11889)",
        purchase: "Vikas Mane (+91 98554 22114)",
        fleet: "Pradip Shinde (+91 97332 55667)"
      },
      workOrders: [
        { id: "WO-2026-001", scope: "Earthwork & Embankment Formation", value: "₹45 Cr", status: "Approved" },
        { id: "WO-2026-042", scope: "Bituminous Paving DBM/BC", value: "₹80 Cr", status: "Active" }
      ],
      cctvFeeds: [
        { name: "Camera 01 - Batching Plant", status: "Live Feed Online" },
        { name: "Camera 02 - Bridge Span 4", status: "Live Feed Online" }
      ]
    },
    {
      id: 2,
      name: "SH-12 Ring Road Expansion",
      type: "State Highway Corridor",
      status: "Moderate Risk",
      risk: "moderate",
      statusClass: "bg-[#fef7e0] text-[#b06000]",
      progress: 61,
      progressColor: "bg-[#b06000]",
      budget: "₹150.0 Cr",
      done: "₹92.0 Cr",
      billed: "₹83.0 Cr",
      unbilled: "₹9.0 Cr",
      profit: "+₹14.1 Cr (9.4%) - Profit",
      deadline: "June 2027 (65% Timeline Elapsed)",
      location: "Kolhapur Ring Road Outer Corridor, Sector 3",
      boq: {
        trucks: { actual: 28, proposed: 30 },
        tippers: { actual: 20, proposed: 25 },
        excavators: { actual: 10, proposed: 12 },
        machinery: { actual: 60, proposed: 70 },
        workforce: { actual: 280, proposed: 320 }
      },
      contacts: {
        pm: "Sameer Joshi (+91 98221 33441)",
        supervisor: "Anil More (+91 97655 44332)",
        billing: "Pooja Deshpande (+91 99222 55661)",
        purchase: "Santosh Pawar (+91 98551 22334)",
        fleet: "Mahesh Jadhav (+91 97331 44556)"
      },
      workOrders: [
        { id: "WO-2026-012", scope: "Drainage & Retaining Walls", value: "₹35 Cr", status: "In Progress" }
      ],
      cctvFeeds: [
        { name: "Camera 01 - Toll Plaza Junction", status: "Live Feed Online" }
      ]
    },
    {
      id: 3,
      name: "Expressway Flyover Sec IV",
      type: "Urban Elevated Structure",
      status: "On Track",
      risk: "profitable",
      statusClass: "bg-[#e6f4ea] text-[#137333]",
      progress: 29,
      progressColor: "bg-[#137333]",
      budget: "₹120.0 Cr",
      done: "₹35.0 Cr",
      billed: "₹30.2 Cr",
      unbilled: "₹4.8 Cr",
      profit: "+₹18.0 Cr (15.0%) - Profit",
      deadline: "December 2027 (30% Timeline Elapsed)",
      location: "Expressway Intersection IV, Kolhapur",
      boq: {
        trucks: { actual: 20, proposed: 20 },
        tippers: { actual: 15, proposed: 15 },
        excavators: { actual: 8, proposed: 10 },
        machinery: { actual: 45, proposed: 40 },
        workforce: { actual: 210, proposed: 200 }
      },
      contacts: {
        pm: "Vikram Kadam (+91 98111 22331)",
        supervisor: "Ramesh Shinde (+91 97444 33221)",
        billing: "Sneha Patil (+91 99112 33445)",
        purchase: "Kishor Mane (+91 98443 22112)",
        fleet: "Ajit Deshmukh (+91 97221 33445)"
      },
      workOrders: [
        { id: "WO-2026-088", scope: "Piling & Foundation Piers", value: "₹50 Cr", status: "Near Completion" }
      ],
      cctvFeeds: [
        { name: "Camera 01 - Pier 12 Casting", status: "Live Feed Online" }
      ]
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f6f9] text-[#1e1e1e] selection:bg-[#af2024] selection:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes continuous-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes android-fade-in {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes android-slide-right {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes rainfall {
          0% { transform: translateY(-20px); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(180px); opacity: 0; }
        }
        @keyframes gradient-border-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-marquee {
          display: inline-block;
          animation: marquee 25s linear infinite;
        }
        .animate-spin-badge {
          animation: continuous-spin 6s linear infinite;
        }
        .android-card-transition {
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .android-card-transition:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px -10px rgba(0,0,0,0.08);
        }
        .android-modal-enter {
          animation: android-fade-in 0.25s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }
        .android-slide-enter {
          animation: android-slide-right 0.3s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
        }
        .rain-drop {
          position: absolute;
          background: linear-gradient(transparent, rgba(56, 189, 248, 0.8));
          width: 1.5px;
          height: 16px;
          opacity: 0.7;
          animation: rainfall linear infinite;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .glass-button {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.95);
        }

        .animated-gradient-border-profitable {
          background: linear-gradient(60deg, #137333, #ffffff, #34a853, #ffffff, #137333);
          background-size: 300% 300%;
          animation: gradient-border-flow 6s ease infinite;
          padding: 1px;
        }
        .animated-gradient-border-moderate {
          background: linear-gradient(60deg, #b06000, #ffffff, #f59e0b, #ffffff, #b06000);
          background-size: 300% 300%;
          animation: gradient-border-flow 6s ease infinite;
          padding: 1px;
        }
        .animated-gradient-border-lossful {
          background: linear-gradient(60deg, #af2024, #ffffff, #ea4335, #ffffff, #af2024);
          background-size: 300% 300%;
          animation: gradient-border-flow 6s ease infinite;
          padding: 1px;
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e1e1e] text-white px-5 py-3.5 rounded-2xl shadow-2xl text-[14px] font-semibold border border-white/10 android-modal-enter flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#af2024] animate-ping"></span>
          {toastMessage}
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-[28px] max-w-xl w-full p-7 shadow-2xl android-modal-enter border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="text-[18px] font-bold text-gray-900 flex items-center gap-2.5">
                <span className="text-[#af2024] p-2 bg-[#fce8e6] rounded-xl">{IconOutlined.calendar}</span> Executive Schedule & Calendar
              </h3>
              <button onClick={() => setShowCalendarModal(false)} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer transition flex items-center justify-center">✕</button>
            </div>
            
            <div className="my-5 flex flex-col gap-3">
              <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-900">11:00 AM - Board Meeting</div>
                  <div className="text-[12.5px] text-gray-500">Kolhapur HQ Boardroom • Strategy & Cashflow Review</div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-[11px] rounded-full">Confirmed</span>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-900">03:30 PM - SH-12 Site Inspection</div>
                  <div className="text-[12.5px] text-gray-500">Ring Road Corridor Sector 3 • Sub-base check</div>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 font-bold text-[11px] rounded-full">High Priority</span>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-900">06:00 PM - Tendering Review</div>
                  <div className="text-[12.5px] text-gray-500">Virtual Room 4 • Pune-Nashik Greenfield Bid</div>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 font-bold text-[11px] rounded-full">Scheduled</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => triggerToast("Successfully added reminders to native Android/iOS Calendar!")} className="flex-1 py-3 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-semibold text-[14px] cursor-pointer transition shadow-lg shadow-[#af2024]/20">
                📲 Add reminders to my calendar (Android/iOS)
              </button>
              <button onClick={() => setShowCalendarModal(false)} className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl font-semibold text-[14px] cursor-pointer transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CCTV Video Stream Modal */}
      {activeCctv && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-[28px] max-w-xl w-full p-7 shadow-2xl android-modal-enter border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="text-[18px] font-semibold text-[#1e1e1e] flex items-center gap-2.5">
                <span className="text-[#af2024] p-2 bg-[#fce8e6] rounded-xl">{IconOutlined.cctv}</span> Live Stream: {activeCctv}
              </h3>
              <button onClick={() => setActiveCctv(null)} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer transition flex items-center justify-center">✕</button>
            </div>
            <div className="my-6 bg-[#1e1e1e] text-white h-72 rounded-2xl flex flex-col items-center justify-center gap-3 relative overflow-hidden shadow-inner">
              <div className="absolute top-4 left-4 bg-red-600/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider flex items-center gap-1.5 shadow">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span> LIVE 1080P HD
              </div>
              <span className="text-[48px] animate-bounce">🎥</span>
              <span className="text-[14px] font-medium tracking-wide opacity-90">Kolhapur Site Yard Secure IoT Gateway</span>
              <span className="text-[12px] opacity-60 font-mono">Bitrate: 4.8 Mbps • Latency: 120ms</span>
            </div>
            <button onClick={() => setActiveCctv(null)} className="w-full py-3 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-semibold text-[14px] cursor-pointer transition shadow-lg shadow-[#af2024]/20">Close Stream</button>
          </div>
        </div>
      )}

      {/* Voice Recording Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-[28px] max-w-md w-full p-7 shadow-2xl android-modal-enter text-center border border-gray-100">
            <h3 className="text-[19px] font-semibold text-[#1e1e1e] mb-2 flex items-center justify-center gap-2.5">
              <span className="text-[#af2024]">{IconOutlined.mic}</span> Voice Command Studio
            </h3>
            <p className="text-[13.5px] text-[#1e1e1e]/70 mb-6 leading-relaxed">Speak clearly into your microphone. Say any site name followed by a metric request (e.g., "Show NH-66 unbilled JMR").</p>
            
            <div className="w-28 h-28 mx-auto rounded-full bg-[#fce8e6] text-[#af2024] flex items-center justify-center text-[40px] animate-pulse mb-6 border-8 border-[#af2024]/15 shadow-inner">
              🎙️
            </div>

            <div className="p-4 bg-[#f8fafc] border border-gray-100 rounded-2xl text-[13.5px] font-mono text-[#1e1e1e] mb-6 shadow-sm">
              {isListening ? "Listening... 'Show NH-66 unbilled JMR details'" : "Ready. Click below to begin speech recognition."}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {
                  setIsListening(true);
                  setTimeout(() => {
                    setIsListening(false);
                    setShowVoiceModal(false);
                    triggerToast("Voice Query Processed: NH-66 JMR retrieved!");
                  }, 3000);
                }} 
                className="flex-1 py-3 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-semibold text-[14px] cursor-pointer transition shadow-lg shadow-[#af2024]/20"
              >
                {isListening ? "Recording in progress..." : "Start Recording"}
              </button>
              <button 
                onClick={() => { setIsListening(false); setShowVoiceModal(false); }} 
                className="px-5 py-3 bg-gray-100 hover:bg-gray-200 text-[#1e1e1e] rounded-2xl font-semibold text-[14px] cursor-pointer transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GPS Map Navigation Modal */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-7 shadow-2xl android-modal-enter border border-gray-100">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <h3 className="text-[18px] font-semibold text-[#1e1e1e] flex items-center gap-2.5">
                <span className="text-[#af2024] p-2 bg-[#fce8e6] rounded-xl">{IconOutlined.map}</span> AI Site Trip Planner & Live GPS Route
              </h3>
              <button onClick={() => setShowMapModal(false)} className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer transition flex items-center justify-center">✕</button>
            </div>
            
            <div className="my-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white h-72 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-inner border border-gray-800">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <span className="text-[44px] z-10 animate-bounce">📍🚗💨</span>
              <div className="z-10 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-lg mt-3 font-semibold text-[13.5px] text-emerald-400 border border-white/10 flex items-center gap-2">
                <span>{IconOutlined.mapPin}</span> Optimal Route: HQ Kolhapur → NH-66 Bypass (ETA: 42 mins)
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center mb-6">
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100"><div className="text-[11px] text-gray-400 font-semibold uppercase">Traffic Density</div><div className="text-[14px] font-bold text-gray-800 mt-0.5">Low</div></div>
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100"><div className="text-[11px] text-gray-400 font-semibold uppercase">Total Distance</div><div className="text-[14px] font-bold text-gray-800 mt-0.5">32.4 km</div></div>
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100"><div className="text-[11px] text-gray-400 font-semibold uppercase">Route Weather</div><div className="text-[14px] font-bold text-gray-800 mt-0.5">Clear / Sunny</div></div>
            </div>

            <button onClick={() => { setShowMapModal(false); triggerToast("GPS Navigation synced to vehicle HUD!"); }} className="w-full py-3 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-semibold text-[14px] cursor-pointer transition shadow-lg shadow-[#af2024]/20">
              Sync Navigation to Vehicle HUD →
            </button>
          </div>
        </div>
      )}

      {/* Profile Actions Dropdown Modal */}
      {showProfileMenu && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-6 pt-20" onClick={() => setShowProfileMenu(false)}>
          <div className="bg-white rounded-[24px] w-72 shadow-2xl border border-gray-100 p-4 flex flex-col gap-2 android-modal-enter" onClick={(e) => e.stopPropagation()}>
            <div className="pb-3.5 border-b border-gray-100 flex items-center gap-3">
              <span className="p-2 bg-[#fce8e6] text-[#af2024] rounded-xl">{IconOutlined.user}</span>
              <div>
                <div className="font-semibold text-[15px] text-[#1e1e1e]">Sushant (Director)</div>
                <div className="text-[12px] text-gray-400 font-normal">sushant@mdinfra.com</div>
              </div>
            </div>
            <button onClick={() => { setShowProfileMenu(false); triggerToast("Opening Director Account Settings..."); }} className="w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-3">
              <span className="text-gray-400">{IconOutlined.user}</span> View Director Profile
            </button>
            <button onClick={() => { setShowProfileMenu(false); triggerToast("Switched Enterprise Security Role"); }} className="w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-gray-700 hover:bg-gray-50 transition flex items-center gap-3">
              <span className="text-gray-400">{IconOutlined.shield}</span> Security & Permissions
            </button>
            <button onClick={() => { setShowProfileMenu(false); triggerToast("Logged out successfully"); }} className="w-full text-left px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium text-[#af2024] hover:bg-[#fce8e6]/50 transition flex items-center gap-3">
              🚪 Logout Session
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Responsive Collapsible Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200/70 flex flex-col justify-between p-4 shrink-0 transition-all duration-300 shadow-sm
        ${isSidebarCollapsed ? 'md:w-[80px]' : 'md:w-[280px]'}
        ${isMobileMenuOpen ? 'w-[280px] translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            {(!isSidebarCollapsed || isMobileMenuOpen) && (
              <div className="flex items-center gap-2.5 overflow-hidden android-slide-enter">
                <img src="/logo.png" alt="MD Infra Logo" className="w-52 h-auto object-contain rounded" />
              </div>
            )}

            {/* Mobile Close Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 font-bold"
            >
              ✕
            </button>
          </div>

          {(!isSidebarCollapsed || isMobileMenuOpen) && (
            <div className="text-[11px] text-gray-400 mt-4 mb-2 font-bold uppercase tracking-wider px-2">Workspace Modules</div>
          )}
          
          <ul className="flex flex-col gap-1.5 mt-2 overflow-y-auto max-h-[calc(100vh-180px)] pr-1">
            {menuItems.map((item) => (
              <li 
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSelectedSite(null);
                  setIsMobileMenuOpen(false);
                  triggerToast(`Navigated to ${item.name} Module`);
                }}
                className={`flex items-center gap-3.5 p-3 rounded-2xl text-[14px] font-semibold cursor-pointer transition-all ${activeTab === item.id && !selectedSite ? 'bg-[#af2024] text-white shadow-lg shadow-[#af2024]/20 scale-[1.02]' : 'bg-transparent text-gray-600 hover:bg-gray-50 hover:text-[#af2024]'}`}
                title={isSidebarCollapsed && !isMobileMenuOpen ? item.name : ''}
              >
                <span className="text-[17px] shrink-0 font-light opacity-90">{item.icon}</span>
                {(!isSidebarCollapsed || isMobileMenuOpen) && <span className="truncate">{item.name}</span>}
              </li>
            ))}
          </ul>
        </div>

        {(!isSidebarCollapsed || isMobileMenuOpen) && (
          <div className="text-[12px] text-gray-400 border-t border-gray-100 pt-3.5 font-medium px-2">
            MDI Private Limited • Kolhapur HQ
          </div>
        )}
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-y-auto relative w-full">
        {/* Marquee Tenders News with Sidebar Toggle Button positioned to the left of it, styled identically */}
        <div className="bg-[#af2024] text-white text-[13px] font-semibold py-3 px-6 flex items-center overflow-hidden shrink-0 shadow-md gap-4">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex bg-white/15 text-white font-semibold px-3.5 py-1.5 rounded-full text-[11px] shrink-0 border border-white/25 items-center gap-1.5 shadow-sm cursor-pointer hover:bg-white/25 transition"
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
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
              <span onClick={() => window.open('https://mahatenders.gov.in', '_blank')} className="hover:underline">
                ⚡ MSRDC announces Mumbai-Goa Coastal Highway Expansion Package 4 (Pre-bid: Sept 12) → Click to view portal
              </span>
            </div>
          </div>
        </div>

        <header className="bg-white/80 backdrop-blur-md px-4 sm:px-8 py-4 border-b border-gray-200/70 flex justify-between items-center sticky top-0 z-10 shadow-xs gap-3">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
              title="Open Menu"
            >
              ☰
            </button>
            <div>
              <h2 className="text-[18px] sm:text-[22px] font-bold tracking-tight text-[#1e1e1e]">Sushant's Command Centre</h2>
              <p className="text-[12px] sm:text-[13px] text-gray-400 font-normal mt-0.5 hidden sm:block">Live Interactive Enterprise ERP Environment</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden lg:flex items-center bg-gray-50 border border-gray-200/80 rounded-2xl px-3.5 py-2 w-64 xl:w-72 gap-2.5 transition focus-within:ring-2 focus-within:ring-[#af2024]/20 focus-within:bg-white">
              <input 
                type="text" 
                value={voiceQuery}
                onChange={(e) => setVoiceQuery(e.target.value)}
                placeholder={isListening ? "Listening..." : "Dispatch command..."}
                className="border-none bg-transparent outline-none text-[13.5px] font-normal w-full text-gray-800 placeholder-gray-400"
              />
              <button 
                onClick={() => setShowVoiceModal(true)}
                className="w-8 h-8 rounded-full border-none flex items-center justify-center text-white bg-[#1e1e1e] cursor-pointer transition shrink-0 hover:bg-[#af2024] shadow-sm"
                title="Voice-to-Text"
              >
                {IconOutlined.mic}
              </button>
            </div>

            {/* Check Pending Tasks from Office Button with Rollover Badge */}
            <div 
              title="4 Pending Office Tasks" 
              onClick={() => triggerToast("Opening Office Task Management Queue...")} 
              className="relative bg-gray-50 border border-gray-200/80 px-3.5 sm:px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-gray-100 text-gray-700 font-semibold text-[13px] transition flex items-center gap-2 shadow-xs"
            >
              <span className="hidden sm:inline">📋 Pending Tasks</span>
              <span className="sm:hidden">📋</span>
              <span className="w-5 h-5 bg-[#af2024] text-white rounded-full flex items-center justify-center text-[11px] font-bold shadow-sm">4</span>
            </div>

            {/* Notification Icon */}
            <div onClick={() => triggerToast("Opened Notification Center")} className="relative bg-gray-50 border border-gray-200/80 p-2.5 sm:p-3 rounded-2xl cursor-pointer hover:bg-[#fce8e6] hover:border-[#af2024]/30 text-gray-700 transition">
              {IconOutlined.bell}
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md animate-spin-badge">
                <span className="font-extrabold text-[12px] leading-none">✱</span>
              </div>
            </div>

            <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 cursor-pointer p-1.5 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-200">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#af2024] text-white flex items-center justify-center font-bold text-[14px] shadow-md shadow-[#af2024]/20">SU</div>
              <div className="hidden md:block">
                <div className="text-[14px] font-bold text-gray-900 leading-tight">Sushant</div>
                <div className="text-[11.5px] text-gray-400 font-medium">Director Level 1</div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8 flex flex-col gap-6 android-slide-enter">
          {/* ==========================================
              DEDICATED FULL-PAGE SITE INSPECTION VIEW
             ========================================== */}
          {selectedSite ? (
            <div className="flex flex-col gap-6 android-slide-enter">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-gray-200/80 rounded-[24px] p-5 shadow-sm gap-4">
                <button 
                  onClick={() => setSelectedSite(null)}
                  className="px-4.5 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl font-semibold text-[13.5px] text-gray-700 cursor-pointer transition shadow-xs"
                >
                  ← Back to Command Centre
                </button>
                <div className="text-left md:text-right">
                  <h2 className="text-[19px] font-bold text-gray-900">{selectedSite.name}</h2>
                  <p className="text-[12px] text-gray-400 font-medium">{selectedSite.type} • {selectedSite.location}</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button 
                    onClick={() => handleScheduleMeeting(selectedSite.name)}
                    className="px-4.5 py-2.5 glass-button text-[#1e1e1e] rounded-2xl text-[13.5px] font-bold cursor-pointer transition shadow-sm hover:border-[#af2024]/40 flex items-center gap-2 border border-sky-200/60 bg-sky-50/50"
                  >
                    📅 Schedule Meeting
                  </button>
                  <button 
                    onClick={() => handleExcelExport(selectedSite.name)}
                    className="px-4.5 py-2.5 bg-[#137333] hover:bg-[#0d5023] text-white rounded-2xl text-[13.5px] font-semibold cursor-pointer transition shadow-md shadow-[#137333]/20"
                  >
                    📊 Export Excel Report
                  </button>
                  <button 
                    onClick={() => triggerToast(`Exported ${selectedSite.name} report to Telegram (PDF & XLS)!`)}
                    className="px-4.5 py-2.5 bg-[#1e1e1e] hover:bg-gray-800 text-white rounded-2xl text-[13.5px] font-semibold cursor-pointer transition shadow-md"
                  >
                    📤 Export to Telegram
                  </button>
                </div>
              </div>

              {/* Financial Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm android-card-transition">
                  <span className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider">Total Project Cost</span>
                  <div className="text-[36px] font-extrabold text-[#af2024] mt-1.5"><b>{selectedSite.budget}</b></div>
                  <span className="text-[12.5px] font-medium text-gray-500 mt-1 block">Approved Contract Value</span>
                </div>

                <div className="bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex flex-col justify-between android-card-transition">
                  <div>
                    <span className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider">Unbilled JMR Amount</span>
                    <div className="text-[30px] font-extrabold text-[#b06000] mt-1.5"><b>{selectedSite.unbilled}</b></div>
                    <span className="text-[12.5px] font-medium text-gray-500">Pending Sign-off from Authority</span>
                  </div>
                  <button 
                    onClick={() => triggerToast(`Request sent to Billing Team to raise bill for ${selectedSite.name}!`)}
                    className="mt-5 w-full py-3 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl text-[13.5px] font-semibold cursor-pointer transition shadow-lg shadow-[#af2024]/20"
                  >
                    Raise Bill Request to Team →
                  </button>
                </div>

                <div className="bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex flex-col justify-between android-card-transition">
                  <div>
                    <span className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider">Total Billed Amount (RA)</span>
                    <div className="text-[30px] font-extrabold text-gray-900 mt-1.5"><b>{selectedSite.billed}</b></div>
                    <span className="text-[12.5px] font-medium text-gray-500">RA Bills Dispatched & Passed</span>
                  </div>
                  <button 
                    onClick={() => setShowBilledDetails(!showBilledDetails)}
                    className="mt-5 w-full py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 rounded-2xl text-[13.5px] font-semibold cursor-pointer transition"
                  >
                    {showBilledDetails ? "Hide Billed Breakdown" : "Inspect Billed Details ↓"}
                  </button>
                </div>
              </div>

              {showBilledDetails && (
                <div className="p-6 bg-white border border-[#af2024]/30 rounded-[24px] shadow-sm android-modal-enter">
                  <h4 className="font-bold text-[16px] text-gray-900 mb-4">Detailed Billed Invoices Breakdown</h4>
                  <div className="flex flex-col gap-3 text-[14px]">
                    <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 font-medium"><span>RA Bill #14 (July 2026)</span><span className="font-bold text-gray-900"><b>₹42.0 Cr</b></span></div>
                    <div className="flex justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 font-medium"><span>RA Bill #15 (August 2026)</span><span className="font-bold text-gray-900"><b>₹120.0 Cr</b></span></div>
                  </div>
                </div>
              )}

              {/* BOQ Comparison */}
              <div className="bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm android-card-transition">
                <h4 className="font-bold text-[16px] text-gray-900 mb-5">On-Site Assets vs Proposed BOQ</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="text-[11.5px] text-gray-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">{IconOutlined.truck} Trucks</div>
                    <div className="text-[20px] font-bold text-gray-900 mt-2"><b>{selectedSite.boq.trucks.actual}</b> <span className="text-[12.5px] text-gray-400 font-medium">/ {selectedSite.boq.trucks.proposed}</span></div>
                  </div>
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="text-[11.5px] text-gray-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">{IconOutlined.truck} Tippers</div>
                    <div className="text-[20px] font-bold text-gray-900 mt-2"><b>{selectedSite.boq.tippers.actual}</b> <span className="text-[12.5px] text-gray-400 font-medium">/ {selectedSite.boq.tippers.proposed}</span></div>
                  </div>
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="text-[11.5px] text-gray-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">{IconOutlined.ruler} Excavators</div>
                    <div className="text-[20px] font-bold text-gray-900 mt-2"><b>{selectedSite.boq.excavators.actual}</b> <span className="text-[12.5px] text-gray-400 font-medium">/ {selectedSite.boq.excavators.proposed}</span></div>
                  </div>
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl">
                    <div className="text-[11.5px] text-gray-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">{IconOutlined.box} Machinery</div>
                    <div className="text-[20px] font-bold text-gray-900 mt-2"><b>{selectedSite.boq.machinery.actual}</b> <span className="text-[12.5px] text-gray-400 font-medium">/ {selectedSite.boq.machinery.proposed}</span></div>
                  </div>
                  <div className="p-5 bg-gray-50 border border-gray-100 rounded-2xl md:col-span-1 col-span-2">
                    <div className="text-[11.5px] text-gray-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">{IconOutlined.worker} Workforce</div>
                    <div className="text-[20px] font-bold text-[#137333] mt-2"><b>{selectedSite.boq.workforce.actual}</b> <span className="text-[12.5px] text-gray-400 font-medium">/ {selectedSite.boq.workforce.proposed}</span></div>
                  </div>
                </div>
              </div>

              {/* Map & CCTV / Work Orders & Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex flex-col justify-between android-card-transition">
                  <div>
                    <h4 className="font-bold text-[16px] text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-[#af2024]">{IconOutlined.mapPin}</span> Site GPS Location Map
                    </h4>
                    <div onClick={() => setShowMapModal(true)} className="h-36 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center font-medium text-[13.5px] text-gray-500 cursor-pointer hover:bg-gray-100 transition shadow-inner">
                      🗺️ Interactive Map View: {selectedSite.location} (Click to open)
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-bold text-[16px] text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-[#af2024]">{IconOutlined.cctv}</span> Installed CCTV Camera Feeds
                    </h4>
                    <div className="flex flex-col gap-3">
                      {selectedSite.cctvFeeds.map((cam: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center p-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[14px] font-medium">
                          <span className="flex items-center gap-2.5 text-gray-800"><span>{IconOutlined.cctv}</span> {cam.name}</span>
                          <button onClick={() => setActiveCctv(cam.name)} className="px-3.5 py-1.5 bg-[#1e1e1e] hover:bg-gray-800 text-white rounded-xl text-[12px] font-semibold cursor-pointer transition">Watch Live</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm flex flex-col justify-between android-card-transition">
                  <div>
                    <h4 className="font-bold text-[16px] text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-[#af2024]">{IconOutlined.clipboard}</span> Active Work Orders
                    </h4>
                    <div className="flex flex-col gap-3">
                      {selectedSite.workOrders.map((wo: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center p-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-[14px]">
                          <div>
                            <div className="font-semibold text-gray-900">{wo.id} - {wo.scope}</div>
                            <div className="text-[12.5px] text-gray-400 mt-0.5">Value: <b>{wo.value}</b></div>
                          </div>
                          <span className="px-3 py-1 bg-[#e6f4ea] text-[#137333] font-bold text-[12px] rounded-full">✓ {wo.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-bold text-[16px] text-gray-900 mb-2 flex items-center gap-2">
                      <span className="text-[#af2024]">{IconOutlined.calendar}</span> Project Deadline & Timeline Progress
                    </h4>
                    <div className="text-[13px] text-gray-500 font-medium mb-3">{selectedSite.deadline}</div>
                    <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-0.5 border border-gray-200/50">
                      <div className="h-full bg-[#137333] rounded-full transition-all duration-1000" style={{ width: `${selectedSite.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-[#fef2f2] border border-[#af2024]/20 rounded-[24px] p-6 shadow-xs">
                <h4 className="font-bold text-[16px] text-[#af2024] mb-5">Emergency Message & Direct Contact System</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-[13.5px]">
                  {Object.entries(selectedSite.contacts).map(([role, contact]: [string, any], idx) => (
                    <div key={idx} className="p-5 bg-white border border-red-100 rounded-2xl flex flex-col justify-between shadow-xs android-card-transition">
                      <div>
                        <div className="font-bold uppercase text-[11px] text-gray-400 tracking-wider">{role}</div>
                        <div className="font-semibold text-gray-900 mt-2 leading-snug">{contact}</div>
                      </div>
                      <button 
                        onClick={() => triggerToast(`Emergency SOS dispatched to ${role.toUpperCase()}!`)}
                        className="mt-5 py-2.5 bg-[#af2024] hover:bg-[#92191d] text-white rounded-xl text-[12px] font-bold cursor-pointer transition shadow-md shadow-[#af2024]/20"
                      >
                        🚨 Emergency SOS
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ==========================================
                COMMAND CENTRE DASHBOARD
               ========================================== */
            activeTab === 'command' && (
              <div className="flex flex-col gap-6 android-slide-enter">
                {/* Message at top & Weather today with Rain Animation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-[#1e1e1e] to-gray-900 text-white rounded-[28px] p-7 flex flex-col justify-between shadow-xl android-card-transition relative overflow-hidden">
                    <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#af2024]/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div>
                      <div className="text-[12px] font-bold opacity-60 uppercase tracking-widest">Executive Morning Briefing</div>
                      <h1 className="text-[26px] sm:text-[30px] font-bold mt-1.5 tracking-tight">Hello, good morning, Sushant.</h1>
                      <p className="text-[14px] opacity-85 font-normal mt-2 leading-relaxed">All 4 strategic sites are fully mobilized. Operations running at <b>94.6%</b> operational efficiency.</p>
                    </div>
                    <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[13px] font-medium opacity-90 gap-2">
                      <span>📍 Kolhapur Site Headquarters</span>
                      <span>🕒 Aug 27, 2026 • 12:52 PM</span>
                    </div>
                  </div>

                  {/* Weather Intelligence Card with Rain Animation */}
                  <div className="bg-white border border-gray-200/80 rounded-[28px] p-7 flex flex-col justify-between shadow-sm android-card-transition relative overflow-hidden">
                    {/* Simulated Rain Container Background */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                      {mounted && rainDrops.map((drop) => (
                        <span
                          key={drop.id}
                          className="rain-drop"
                          style={{
                            left: drop.left,
                            animationDuration: drop.animationDuration,
                            animationDelay: drop.animationDelay
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <div className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider">Weather Intelligence • Kolhapur</div>
                        <div className="text-[20px] sm:text-[23px] font-bold text-gray-900 mt-1.5"><b>29°C</b> · Heavy Rain Forecast Expected at <b>4:30 PM</b></div>
                      </div>
                      <div className="text-[36px] bg-sky-50 p-3 rounded-2xl shadow-inner relative">
                        🌧️
                      </div>
                    </div>

                    <div className="bg-[#fef7e0] border border-[#f59e0b]/30 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 gap-3 shadow-xs relative z-10">
                      <span className="text-[13px] font-semibold text-[#b06000] leading-snug">⚠️ Rain Alert: Protect open sub-base layers & machinery immediately.</span>
                      <button 
                        onClick={() => {
                          setTelegramAlertSent(true);
                          triggerToast("Telegram alert successfully dispatched to Driver & PA!");
                        }}
                        className="px-4 py-2.5 bg-[#af2024] hover:bg-[#92191d] text-white rounded-xl text-[12.5px] font-semibold cursor-pointer transition shadow-md shadow-[#af2024]/20 shrink-0 w-full sm:w-auto text-center"
                      >
                        {telegramAlertSent ? "✓ Alert Sent!" : "Make Arrangements"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Top three sites sliding with Original Rich Tone, Narrower Green & White Gradient Border, Glass Pie Chart */}
                <div className="bg-white border border-gray-200/80 rounded-[28px] p-7 shadow-sm android-card-transition">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                      <div className="text-[16px] sm:text-[17px] font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-[#af2024]">{IconOutlined.mapPin}</span> Top Strategic Project Sites — Sliding Telemetry & Financial Breakdown
                      </div>
                      <p className="text-[13px] text-gray-400 font-medium mt-0.5">Showing site {siteSlideIndex + 1} of {allSites.length} (Works complete, cost, billed, unbilled, P&L)</p>
                    </div>
                    <div className="flex gap-2.5 self-end sm:self-auto">
                      <button 
                        onClick={() => setSiteSlideIndex(prev => (prev > 0 ? prev - 1 : allSites.length - 1))}
                        className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-2xl font-semibold text-[13.5px] cursor-pointer transition shadow-xs"
                      >
                        ← Prev
                      </button>
                      <button 
                        onClick={() => setSiteSlideIndex(prev => (prev < allSites.length - 1 ? prev + 1 : 0))}
                        className="px-4 py-2 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-semibold text-[13.5px] cursor-pointer transition shadow-md shadow-[#af2024]/20"
                      >
                        Next →
                      </button>
                    </div>
                  </div>

                  {(() => {
                    const site = allSites[siteSlideIndex];
                    const riskCategory = site.risk || 'profitable';
                    const borderClass = riskCategory === 'profitable' 
                      ? 'animated-gradient-border-profitable' 
                      : riskCategory === 'moderate' 
                      ? 'animated-gradient-border-moderate' 
                      : 'animated-gradient-border-lossful';
                    
                    return (
                      <div className={`rounded-[26px] shadow-md ${borderClass}`}>
                        <div className="bg-white rounded-[25px] p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-3 gap-7 android-slide-enter">
                          <div className="lg:col-span-2 flex flex-col justify-between">
                            <div>
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200/60 pb-4 mb-5 gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="text-[19px] font-bold text-gray-900">{site.name}</h3>
                                    <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md ${riskCategory === 'profitable' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                      {riskCategory}
                                    </span>
                                  </div>
                                  <span className="text-[13px] text-gray-400 font-medium">{site.type}</span>
                                </div>
                                <span className={`text-[11.5px] font-bold px-3 py-1 rounded-full shadow-xs ${site.statusClass}`}>{site.status}</span>
                              </div>

                              <div className="mb-5">
                                <div className="flex justify-between text-[13px] font-semibold mb-2">
                                  <span className="text-gray-500">Physical Progress (Works Complete)</span>
                                  <span className="text-[#137333]"><b>{site.progress}%</b> Completed</span>
                                </div>
                                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden p-0.5 border border-gray-200/50">
                                  <div className={`h-full rounded-full transition-all duration-1000 ${site.progressColor}`} style={{ width: `${site.progress}%` }}></div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[14px]">
                                <div className="p-3.5 bg-gray-50/80 border border-gray-200/80 rounded-2xl flex justify-between shadow-xs"><span className="text-gray-500 font-medium">Total Project Cost</span><span className="font-bold text-gray-900"><b>{site.budget}</b></span></div>
                                <div className="p-3.5 bg-gray-50/80 border border-gray-200/80 rounded-2xl flex justify-between shadow-xs"><span className="text-gray-500 font-medium">Total Work Done</span><span className="font-bold text-[#137333]"><b>{site.done}</b></span></div>
                                <div className="p-3.5 bg-gray-50/80 border border-gray-200/80 rounded-2xl flex justify-between shadow-xs"><span className="text-gray-500 font-medium">Billed Amount</span><span className="font-bold text-gray-900"><b>{site.billed}</b></span></div>
                                <div className="p-3.5 bg-gray-50/80 border border-gray-200/80 rounded-2xl flex justify-between shadow-xs"><span className="text-gray-500 font-medium">Unbilled JMR</span><span className="font-bold text-[#b06000]"><b>{site.unbilled}</b></span></div>
                              </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                              <span className="text-[13.5px] font-semibold text-[#137333]">P&L: <b>{site.profit}</b></span>
                              <div className="flex flex-wrap gap-2">
                                <button 
                                  onClick={() => handleScheduleMeeting(site.name)} 
                                  className="px-3.5 py-2.5 glass-button text-gray-900 rounded-2xl text-[12px] font-bold cursor-pointer transition shadow-xs hover:border-sky-400 bg-white/90 border border-sky-200 flex items-center gap-1.5"
                                  title="Schedule Meeting with Team"
                                >
                                  📅 Schedule Meeting
                                </button>
                                <button onClick={() => handleExcelExport(site.name)} className="px-4 py-2.5 bg-[#137333] hover:bg-[#0d5023] text-white rounded-2xl text-[12.5px] font-semibold cursor-pointer transition shadow-md shadow-[#137333]/20">
                                  📊 Export Excel
                                </button>
                                <button onClick={() => setSelectedSite(site)} className="px-4 py-2.5 bg-[#1e1e1e] hover:bg-gray-800 text-white rounded-2xl text-[12.5px] font-semibold cursor-pointer transition shadow-md">
                                  Inspect Details →
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Pie Chart Representation with Glass Effect & Hover Popup */}
                          <div className="glass-panel rounded-[24px] p-6 flex flex-col justify-between items-center text-center relative shadow-sm">
                            <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                              <span>{IconOutlined.chart}</span> Cost Breakdown Distribution
                            </div>
                            
                            <div 
                              onMouseEnter={() => setPieHoverInfo("Materials: 55% (₹132 Cr) | Labor: 30% (₹72 Cr) | Machinery: 15% (₹36 Cr)")}
                              onMouseLeave={() => setPieHoverInfo(null)}
                              className="w-36 h-36 rounded-full border-8 border-[#af2024]/90 border-t-[#137333] border-r-[#b06000] flex items-center justify-center font-bold text-[16px] text-gray-900 shadow-inner my-3 cursor-pointer relative hover:scale-105 transition-transform backdrop-blur-sm bg-white/40"
                            >
                              <b>{site.progress}%</b> Done
                            </div>

                            {pieHoverInfo && (
                              <div className="absolute top-20 bg-[#1e1e1e]/95 backdrop-blur-md text-white text-[11.5px] p-3 rounded-2xl shadow-2xl z-20 w-52 text-center android-modal-enter border border-white/10">
                                {pieHoverInfo}
                              </div>
                            )}

                            <div className="text-[12.5px] text-gray-500 font-medium">
                              Hover pie chart for breakdown popup
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Daily diesel consumption, workforce performance, onsite attendance, fleet in work */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  <div className="bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm android-card-transition">
                    <span className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="text-[#af2024]">{IconOutlined.fuel}</span> Daily Diesel Consumption
                    </span>
                    <div className="text-[24px] font-extrabold text-[#b06000] mt-2"><b>18,420 Litres</b></div>
                    <span className="text-[12.5px] font-medium text-gray-500 mt-1 block">₹18.2 Lakhs Burn Today</span>
                  </div>
                  <div className="bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm android-card-transition">
                    <span className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="text-[#af2024]">{IconOutlined.chart}</span> Workforce Performance
                    </span>
                    <div className="text-[24px] font-extrabold text-[#137333] mt-2"><b>108.4 Points</b></div>
                    <span className="text-[12.5px] font-medium text-[#137333] mt-1 block">▲ +4.5% vs Yesterday</span>
                  </div>
                  <div className="bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm android-card-transition">
                    <span className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="text-[#af2024]">{IconOutlined.worker}</span> Onsite Attendance
                    </span>
                    <div className="text-[24px] font-extrabold text-gray-900 mt-2"><b>1,240 / 1,300</b></div>
                    <span className="text-[12.5px] font-medium text-[#137333] mt-1 block">● 95.3% Attendance Rate</span>
                  </div>
                  <div className="bg-white border border-gray-200/80 rounded-[24px] p-6 shadow-sm android-card-transition">
                    <span className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="text-[#af2024]">{IconOutlined.truck}</span> Fleet & Machinery in Work
                    </span>
                    <div className="text-[24px] font-extrabold text-gray-900 mt-2"><b>142 / 150 Units</b></div>
                    <span className="text-[12.5px] font-medium text-[#137333] mt-1 block">● 94.6% Operational Uptime</span>
                  </div>
                </div>

                {/* AI Recommendation & Excavator Shifting */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[#1e1e1e] text-white rounded-[28px] p-7 flex flex-col justify-between shadow-xl android-card-transition relative overflow-hidden">
                    <div className="absolute -left-8 -top-8 w-40 h-40 bg-[#af2024]/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div>
                      <div className="flex items-center gap-2 font-bold text-[12px] uppercase tracking-widest opacity-70 mb-2">
                        <span>🤖</span> AI Recommendation (Next Best Action)
                      </div>
                      <h3 className="text-[19px] font-bold">Approve Pending JMR Sign-off for NH-66</h3>
                      <p className="text-[14px] opacity-85 font-normal mt-1.5 leading-relaxed">Accelerates billing cycle by 5 days and unlocks <b>₹22 Cr</b> unbilled cash flow.</p>
                    </div>
                    <button onClick={() => triggerToast("JMR approval fast-tracked!")} className="mt-5 px-5 py-3 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl text-[13.5px] font-semibold cursor-pointer w-fit transition shadow-lg shadow-[#af2024]/20">
                      Execute Fast-Track Approval →
                    </button>
                  </div>

                  <div className="bg-white border border-gray-200/80 rounded-[28px] p-7 flex flex-col justify-between shadow-sm android-card-transition">
                    <div>
                      <div className="flex items-center gap-2 font-bold text-[12px] text-[#af2024] uppercase tracking-widest mb-2">
                        <span>🚜</span> AI Business Action (Idle Equipment Shift)
                      </div>
                      <h3 className="text-[18px] font-bold text-gray-900">Shift <b>3 Idle Excavators</b> from NH-66 Yard to Expressway Sec IV</h3>
                      <p className="text-[13.5px] text-gray-500 font-normal mt-1.5 leading-relaxed">IoT telemetry indicates units idle for <b>6 consecutive days</b> while Expressway piling needs support.</p>
                    </div>
                    <button onClick={() => triggerToast("Excavator shift order approved & dispatched!")} className="mt-5 px-5 py-3 bg-[#1e1e1e] hover:bg-gray-800 text-white rounded-2xl text-[13.5px] font-semibold cursor-pointer w-fit transition shadow-md">
                      Approve & Execute Shift Order →
                    </button>
                  </div>
                </div>

                {/* Notification Centre */}
                <div className="bg-white border border-gray-200/80 rounded-[28px] p-7 shadow-sm android-card-transition">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
                    <h3 className="text-[17px] font-bold text-gray-900 flex items-center gap-2.5">
                      <span className="text-[#af2024]">{IconOutlined.bell}</span> Critical Notification Centre
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { id: 'right-away', label: 'Take Action Right Away (2)' },
                        { id: 'upcoming', label: 'Upcoming Actions (1)' },
                        { id: 'overdue', label: 'Overdue Actions (1)' }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveNotificationTab(tab.id)}
                          className={`px-4 py-2 rounded-2xl text-[13px] font-semibold cursor-pointer transition border ${activeNotificationTab === tab.id ? 'bg-[#af2024] text-white border-[#af2024] shadow-md shadow-[#af2024]/20' : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    {activeNotificationTab === 'right-away' && (
                      notifications['right-away'].map(item => (
                        <div key={item.id} className="p-4 bg-[#fef7e0] border border-[#f59e0b]/30 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs android-card-transition">
                          <span className="text-[14px] font-semibold text-[#b06000]">{item.text}</span>
                          <button onClick={() => {
                            setNotifications(prev => ({ ...prev, 'right-away': prev['right-away'].filter(n => n.id !== item.id) }));
                            triggerToast("Action completed successfully!");
                          }} className="px-4 py-2 bg-[#b06000] hover:bg-[#965200] text-white rounded-xl text-[12.5px] font-semibold cursor-pointer transition shadow-sm shrink-0">
                            {item.status === 'Resolved' ? 'Done' : 'Sign & Release'}
                          </button>
                        </div>
                      ))
                    )}
                    {activeNotificationTab === 'upcoming' && (
                      <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl text-[14px] font-medium text-gray-700">
                        • Monthly safety audit scheduled across Expressway Sec IV (Due in 3 days)
                      </div>
                    )}
                    {activeNotificationTab === 'overdue' && (
                      <div className="p-4 bg-[#fef2f2] border border-[#af2024]/20 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs">
                        <span className="text-[14px] font-semibold text-[#af2024]">❌ Subcontractor safety gear compliance report pending from SH-12 Site Manager</span>
                        <button onClick={() => triggerToast("Reminder sent to Site Manager!")} className="px-4 py-2 bg-[#af2024] hover:bg-[#92191d] text-white rounded-xl text-[12.5px] font-semibold cursor-pointer transition shadow-sm shrink-0">Send Reminder</button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Approvals & Escalations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200/80 rounded-[28px] p-7 shadow-sm android-card-transition">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                      <span className="text-[#af2024]">{IconOutlined.card}</span> Pending Approvals, Payments & Documents
                    </h3>
                    <div className="flex flex-col gap-3 text-[14px]">
                      {approvals.map(app => (
                        <div key={app.id} className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-xs">
                          <div>
                            <div className="font-bold text-gray-900">{app.title}</div>
                            <div className="text-[12.5px] text-gray-500 font-medium mt-0.5">Amount: <b>{app.amount}</b> • Status: <span className="text-[#b06000] font-bold">{app.status}</span></div>
                          </div>
                          <button onClick={() => {
                            setApprovals([]);
                            triggerToast(`Payment of ${app.amount} released successfully!`);
                          }} className="px-4 py-2 bg-[#1e1e1e] hover:bg-gray-800 text-white rounded-xl text-[12.5px] font-semibold cursor-pointer transition shadow-sm shrink-0">Release Payment</button>
                        </div>
                      ))}
                      {approvals.length === 0 && (
                        <div className="p-5 text-center text-[#137333] font-bold text-[14px] bg-emerald-50 rounded-2xl border border-emerald-100">✓ All pending approvals cleared!</div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200/80 rounded-[28px] p-7 shadow-sm android-card-transition">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                      <span className="text-[#af2024]">{IconOutlined.shield}</span> Escalation from Teams
                    </h3>
                    <div className="p-5 bg-[#fef2f2] border border-[#af2024]/20 rounded-2xl shadow-xs">
                      <div className="font-bold text-[14.5px] text-[#af2024]">Escalation from Site Engineer (NH-66)</div>
                      <div className="text-[13.5px] text-gray-700 font-normal mt-1 leading-relaxed">Heavy rainfall water-logging at Chainage 42. Immediate pumping units required.</div>
                      <button onClick={() => triggerToast("Emergency water pump unit dispatched to NH-66!")} className="mt-4 px-4 py-2.5 bg-[#af2024] hover:bg-[#92191d] text-white rounded-xl text-[12.5px] font-bold cursor-pointer transition shadow-md shadow-[#af2024]/20">Dispatch Pump Unit →</button>
                    </div>
                  </div>
                </div>

                {/* Calendar, Trip Planner & Material Schedule */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div onClick={() => setShowCalendarModal(true)} className="bg-white border border-gray-200/80 rounded-[28px] p-6 shadow-sm android-card-transition cursor-pointer hover:border-[#af2024]/50">
                    <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-[#af2024]">{IconOutlined.calendar}</span> Executive Calendar (Click)
                    </h3>
                    <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl text-[13.5px] shadow-xs">
                      <div className="font-bold text-[#af2024] mb-1.5">Today: August 27, 2026</div>
                      <ul className="text-gray-600 font-medium flex flex-col gap-1.5">
                        <li>• 11:00 AM - Board Meeting</li>
                        <li>• 03:30 PM - SH-12 Inspection</li>
                        <li>• 06:00 PM - Tendering Review</li>
                      </ul>
                      <span className="text-[12px] text-[#af2024] font-bold mt-3 block">Click to view schedule popup →</span>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200/80 rounded-[28px] p-6 shadow-sm android-card-transition">
                    <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-[#af2024]">{IconOutlined.map}</span> Trip Planner & AI Route
                    </h3>
                    <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl text-[13.5px] font-normal shadow-xs">
                      <div className="font-bold text-gray-900 mb-1">HQ Kolhapur → NH-66 Site 2</div>
                      <div className="text-[#137333] font-semibold mb-3">AI Route: Via NH48 Bypass (<b>42 mins</b>)</div>
                      <button onClick={() => setShowMapModal(true)} className="w-full py-2.5 bg-[#1e1e1e] hover:bg-gray-800 text-white rounded-xl text-[12.5px] font-semibold cursor-pointer transition shadow-sm">Start GPS Navigation →</button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200/80 rounded-[28px] p-6 shadow-sm android-card-transition">
                    <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-[#af2024]">{IconOutlined.box}</span> Scheduled Material Purchase
                    </h3>
                    <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl text-[13.5px] font-normal shadow-xs">
                      <div className="flex justify-between font-bold text-gray-900 mb-2"><span>Material</span><span>Scheduled Use</span></div>
                      <div className="flex justify-between text-gray-600 py-1.5 border-b border-dashed border-gray-200 font-medium"><span>Bitumen VG-30</span><span><b>120 Metric Tons</b></span></div>
                      <div className="flex justify-between text-gray-600 pt-1.5 font-medium"><span>OPC Cement Grade 53</span><span><b>450 Bags</b></span></div>
                    </div>
                  </div>
                </div>

                {/* Work Life Balance Section */}
                <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-[28px] p-7 shadow-sm android-card-transition">
                  <h3 className="text-[17px] font-bold text-indigo-900 mb-4 flex items-center gap-2.5">
                    <span>🌟</span> Work Life Balance & Personal Milestones
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-5 bg-white border border-indigo-100 rounded-2xl shadow-xs">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-gray-900 text-[15px]">Ishotsav 2.0 (Annual Fest)</h4>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 font-bold text-[11px] rounded-full">Nov 1, 2026</span>
                      </div>
                      <p className="text-[13px] text-gray-500 mb-3">Countdown: <b>66 Days Left</b></p>
                      <div className="flex justify-between text-[12.5px] font-semibold mb-1 text-gray-600">
                        <span>Preparation Progress</span>
                        <span>65%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>

                    <div className="p-5 bg-white border border-indigo-100 rounded-2xl shadow-xs">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-gray-900 text-[15px]">Family Vacation (Goa Coastal Retreat)</h4>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-[11px] rounded-full">Dec 20, 2026</span>
                      </div>
                      <p className="text-[13px] text-gray-500 mb-3">Countdown: <b>115 Days Left</b></p>
                      <div className="flex justify-between text-[12.5px] font-semibold mb-1 text-gray-600">
                        <span>Booking & Itinerary Progress</span>
                        <span>40%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creative Brainstorming Ideas Input Section */}
                <div className="bg-white border border-gray-200/80 rounded-[28px] p-7 shadow-sm android-card-transition">
                  <h3 className="text-[17px] font-bold text-gray-900 mb-2 flex items-center gap-2.5">
                    <span>💡</span> Creative Brainstorming Ideas Input
                  </h3>
                  <p className="text-[13.5px] text-gray-500 mb-4">Capture unstructured strategic thoughts, innovation ideas, or process optimization notes for MDI Private Limited.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text"
                      value={brainstormInput}
                      onChange={(e) => setBrainstormInput(e.target.value)}
                      placeholder="Type a creative brainstorming thought..."
                      className="flex-1 p-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-[14px] outline-none focus:bg-white transition"
                    />
                    <button 
                      onClick={() => {
                        if (brainstormInput.trim()) {
                          triggerToast("💡 Brainstorm idea logged securely to AI Strategy Vault!");
                          setBrainstormInput('');
                        } else {
                          triggerToast("Please type an idea before submitting.");
                        }
                      }}
                      className="px-6 py-3.5 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-bold text-[14px] cursor-pointer transition shadow-md shadow-[#af2024]/20 shrink-0"
                    >
                      Log Idea 🚀
                    </button>
                  </div>
                </div>

                {/* Send Command Section & AI Recommended Meetings */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-200/80 rounded-[28px] p-7 shadow-sm android-card-transition">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                      <span className="text-[#af2024]">{IconOutlined.clipboard}</span> Send Command to Person or Team
                    </h3>
                    <div className="flex flex-col gap-3.5 text-[14px]">
                      <div>
                        <label className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Select Recipient Team / Person</label>
                        <select 
                          value={commandRecipient} 
                          onChange={(e) => setCommandRecipient(e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl font-semibold outline-none text-gray-800 focus:bg-white transition"
                        >
                          <option>Project Manager (NH-66)</option>
                          <option>Billing Team (Kolhapur HQ)</option>
                          <option>Fleet Manager (Shinde)</option>
                          <option>Safety Supervisor</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11.5px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">Command Instructions / Voice Note</label>
                        <div className="flex gap-2.5">
                          <input 
                            type="text" 
                            value={commandText}
                            onChange={(e) => setCommandText(e.target.value)}
                            placeholder="Type command or click mic..."
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none font-normal text-gray-800 focus:bg-white transition"
                          />
                          <button 
                            onClick={() => setShowVoiceModal(true)} 
                            className="px-4 py-3 rounded-2xl text-white font-semibold cursor-pointer shrink-0 bg-[#1e1e1e] hover:bg-[#af2024] transition shadow-sm"
                            title="Voice Command Input"
                          >
                            {IconOutlined.mic}
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          triggerToast(`Command successfully dispatched to ${commandRecipient}!`);
                          setCommandText('');
                        }}
                        className="py-3 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-bold cursor-pointer transition shadow-md shadow-[#af2024]/20"
                      >
                        Dispatch Command Now ⚡
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200/80 rounded-[28px] p-7 shadow-sm android-card-transition">
                    <h3 className="text-[17px] font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                      <span className="text-[#af2024]">{IconOutlined.calendar}</span> AI Recommended Meetings & Site Visits
                    </h3>
                    <div className="flex flex-col gap-3.5">
                      <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center text-[14px] gap-2 shadow-xs">
                        <div>
                          <div className="font-bold text-gray-900">Site Visit: SH-12 Ring Road Sub-base Inspection</div>
                          <div className="text-[12.5px] text-gray-500 font-medium mt-0.5">Today @ 3:30 PM • AI Telemetry Recommendation</div>
                        </div>
                        <button onClick={() => triggerToast("AI site visit accepted & added to calendar!")} className="px-4 py-2 bg-[#1e1e1e] hover:bg-gray-800 text-white rounded-xl text-[12.5px] font-semibold cursor-pointer transition shadow-sm shrink-0">Accept</button>
                      </div>
                      <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center text-[14px] gap-2 shadow-xs">
                        <div>
                          <div className="font-bold text-gray-900">Meeting: Vendor Payment Review with CFO</div>
                          <div className="text-[12.5px] text-gray-500 font-medium mt-0.5">Tomorrow @ 10:00 AM • High Priority</div>
                        </div>
                        <button onClick={() => triggerToast("Meeting scheduled with CFO!")} className="px-4 py-2 bg-[#1e1e1e] hover:bg-gray-800 text-white rounded-xl text-[12.5px] font-semibold cursor-pointer transition shadow-sm shrink-0">Schedule</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}

          {activeTab !== 'command' && !selectedSite && (
            <div className="bg-white border border-gray-200/80 rounded-[28px] p-10 text-center flex flex-col items-center justify-center min-h-[400px] shadow-sm android-slide-enter">
              <div className="text-[48px] mb-4 animate-bounce">🛠️</div>
              <h3 className="text-[20px] font-bold capitalize text-gray-900">{activeTab.replace(/([A-Z])/g, ' $1')} Module Under Development</h3>
              <p className="text-[14px] text-gray-500 mt-2">This dedicated module is currently being configured for MDI Private Limited.</p>
              <button 
                onClick={() => setActiveTab('command')}
                className="mt-6 px-5 py-3 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl text-[14px] font-semibold cursor-pointer transition shadow-lg shadow-[#af2024]/20"
              >
                Return to Command Centre
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}