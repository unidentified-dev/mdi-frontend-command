'use client';

import React, { useState, useEffect } from 'react';

export default function DirectorDashboard() {
  const [mounted, setMounted] = useState(false);
  const [clockAngles, setClockAngles] = useState({ sec: 0, min: 0, hour: 0 });
  const [showClockTooltip, setShowClockTooltip] = useState(false);

  // Weather Carousel State
  const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);
  const siteWeatherReports = [
    { site: 'Tumkuru (Critical)', temp: '32°C', condition: 'Heavy Thunderstorms', type: 'thunderstorm', alert: '⚠️ Critical Warning: Protect open sub-base layers immediately.', statusClass: 'bg-white text-slate-900 border border-slate-300 shadow-sm' },
    { site: 'Hubali', temp: '30°C', condition: 'Moderate Showers', type: 'rainy', alert: 'ℹ️ Advisory: Drainage check recommended for Sector 2.', statusClass: 'bg-white text-slate-900 border border-slate-300 shadow-sm' },
    { site: 'Goa', temp: '31°C', condition: 'Coastal Squalls', type: 'sunny', alert: '⚠️ Coastal Surge Warning: Secure offshore equipment.', statusClass: 'bg-white text-slate-900 border border-slate-300 shadow-sm' },
    { site: 'Satara', temp: '28°C', condition: 'Overcast & Breezy', type: 'cloudy', alert: '✓ Normal Operations: Ideal paving conditions.', statusClass: 'bg-white text-slate-900 border border-slate-300 shadow-sm' },
    { site: 'Vele', temp: '26°C', condition: 'Light Rain', type: 'rainy', alert: 'ℹ️ Ghat Section Caution: Monitor slope stability.', statusClass: 'bg-white text-slate-900 border border-slate-300 shadow-sm' },
    { site: 'Pune', temp: '29°C', condition: 'Heavy Rain Expected', type: 'rainy', alert: '⚠️ Flood Risk Warning: Clear diversion channels.', statusClass: 'bg-white text-slate-900 border border-slate-300 shadow-sm' }
  ];

  // Trip Planner Carousel State
  const [currentTripIndex, setCurrentTripIndex] = useState(0);
  const futureTrips = [
    { destination: 'HQ Kolhapur → Hubali Site 1', route: 'Via NH48 Bypass', duration: '42 mins', type: 'Site Visit' },
    { destination: 'HQ Kolhapur → Tumkuru NHAI Regional Office', route: 'Via Expressway Corridor', duration: '2 hrs 15 mins', type: 'Government Office Meeting' },
    { destination: 'Pune Regional Office → Mumbai Desk (Mantralaya)', route: 'Via Mumbai-Pune Expressway', duration: '3 hrs 10 mins', type: 'Regulatory Compliance' },
    { destination: 'Hubali Site 2 → Goa Coastal Stretch', route: 'Via NH66 Ghat Section', duration: '1 hr 45 mins', type: 'Inspection & Audit' }
  ];

  // Calendar Tooltip State
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Milestone Hover Tooltip State
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);

  // Interactive Demo Modal States
  const [showArrangementModal, setShowArrangementModal] = useState(false);
  const [arrangementSite, setArrangementSite] = useState('');
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [discussionItem, setDiscussionItem] = useState('');
  const [discussionNote, setDiscussionNote] = useState('');

  // Video Popup Modal State for CCTV
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>('');

  // Project Boardroom (Site Details) Sub-tabs & Drill-down states
  const [siteDetailsTab, setSiteDetailsTab] = useState<'overview' | 'financials' | 'progress' | 'costs' | 'decisions' | 'documents'>('overview');
  const [workStatusSubTab, setWorkStatusSubTab] = useState<'financial' | 'completion'>('financial');
  const [drilldownModalData, setDrilldownModalData] = useState<any | null>(null);

  // Accordion state for Departmental Pending Approvals Queue
  const [openApprovalDept, setOpenApprovalDept] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const updateClock = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secDeg = (seconds / 60) * 360;
      const minDeg = ((minutes + seconds / 60) / 60) * 360;
      const hourDeg = ((hours % 12 + minutes / 60) / 12) * 360;

      setClockAngles({ sec: secDeg, min: minDeg, hour: hourDeg });
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const [voiceQuery, setVoiceQuery] = useState('');
  const [activeTab, setActiveTab] = useState('command');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedSite, setSelectedSite] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive states for charts, tabs, and accordions
  const [consolidatedTab, setConsolidatedTab] = useState<'financial' | 'boq'>('financial');
  const [openZone, setOpenZone] = useState<string | null>(null);
  const [openSiteId, setOpenSiteId] = useState<number | null>(null);
  const [aiPopupSite, setAiPopupSite] = useState<any | null>(null);
  
  // Interactive Modals State
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [brainstormInput, setBrainstormInput] = useState('');
  const [newTaskInput, setNewTaskInput] = useState('');
  const [customTasks, setCustomTasks] = useState([
    { day: 4, text: '03:30 PM - Tumkuru Inspection' },
    { day: 5, text: '11:00 AM - NHAI Review' },
    { day: 11, text: '02:00 PM - Board Strategy' },
    { day: 20, text: '10:30 AM - Tendering Deadline' }
  ]);
  
  // Command Dispatch State
  const [commandRecipient, setCommandRecipient] = useState('Project Manager (Hubali)');
  const [commandText, setCommandText] = useState('');

  // Departmental Approvals State
  const [departmentApprovals, setDepartmentApprovals] = useState([
    {
      id: 'tendering',
      dept: 'Tendering & Bids',
      count: 3,
      isCritical: true,
      items: [
        { id: 't1', title: 'Pune-Nashik Greenfield Bid Bond Release', sub: 'Urgent Bank Guarantee sign-off' },
        { id: 't2', title: 'Tumkuru Expressway Pre-qualification Document', sub: 'Review technical annexures' },
        { id: 't3', title: 'NHAI Package 4 Tender Fee Exemption', sub: 'Verification required' }
      ]
    },
    {
      id: 'fleet',
      dept: 'Fleet and Fuel',
      count: 1,
      isCritical: false,
      items: [
        { id: 'f1', title: 'Bulk Diesel Fuel Purchase Order #412', sub: 'Hubali Yard storage tank capacity check' }
      ]
    },
    {
      id: 'purchase',
      dept: 'Purchase & Procurement',
      count: 2,
      isCritical: false,
      items: [
        { id: 'p1', title: 'VG-30 Bitumen Procurement Contract', sub: 'Rate negotiation completed' },
        { id: 'p2', title: 'OPC Cement Grade 53 Quarterly Supply', sub: 'Supplier agreement renewal' }
      ]
    },
    {
      id: 'finance',
      dept: 'Vendor & Finance',
      count: 0,
      isCritical: false,
      items: []
    },
    {
      id: 'accounts',
      dept: 'Accounts & Audit',
      count: 4,
      isCritical: true,
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
      isCritical: false,
      items: [
        { id: 's1', title: 'Expressway Sec IV Safety Gear Audit', sub: 'High-visibility jacket compliance report' }
      ]
    },
    {
      id: 'it',
      dept: 'IT & IoT Systems',
      count: 0,
      isCritical: false,
      items: []
    }
  ]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExcelExport = (reportName: string) => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Report,GeneratedDate,Status\n"
      + `${reportName},2026-09-04,Verified Active\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${reportName.replace(/\s+/g, '_')}_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(`📊 Successfully exported ${reportName} to XLS (CSV)!`);
  };

  const handlePdfExport = (reportName: string) => {
    triggerToast(`📄 Successfully generated and downloaded ${reportName} PDF report!`);
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

  // Specific grid cards relevant to each menu item
  const menuPageContent: Record<string, Array<{ title: string; subtitle: string; stat: string; action: string; badge: string; icon: string }>> = {
    tendering: [
      { title: "Active NHAI Bids", subtitle: "Package 4 Expressway Expansion", stat: "₹450 Cr", action: "Review Submissions", badge: "Urgent", icon: "📋" },
      { title: "Bid Bond Guarantees", subtitle: "Sraswat Bank Facility #902", stat: "₹18.2 Cr", action: "Release Guarantee", badge: "Active", icon: "🏦" },
      { title: "Pre-qualification Docs", subtitle: "Pune-Nashik Greenfield Corridor", stat: "3 Bids", action: "Verify Annexures", badge: "Pending", icon: "📑" },
      { title: "Tender Fee Exemptions", subtitle: "Micro-Enterprise MSME Registry", stat: "Verified", action: "View Status", badge: "Approved", icon: "🛡️" }
    ],
    engineering: [
      { title: "Structural Drawing Revisions", subtitle: "Hubali Bypass Sector 2 Pier Caps", stat: "14 Drawings", action: "Approve CAD Files", badge: "Review", icon: "📐" },
      { title: "Geotechnical Survey Logs", subtitle: "Tumkuru Outer Corridor Soil Testing", stat: "98% Complete", action: "View Soil Report", badge: "Verified", icon: "🧪" },
      { title: "Ghat Slope Stability Audit", subtitle: "Vele Sector 7 Embankment", stat: "2 Alerts", action: "Dispatch Survey Team", badge: "Attention", icon: "⛰️" },
      { title: "BIM 3D Model Sync", subtitle: "Kolhapur HQ Design Desk", stat: "Synced", action: "Open Viewer", badge: "Online", icon: "🖥️" }
    ],
    fleet: [
      { title: "CAT Excavators & Pavers", subtitle: "Active deployment across 6 sites", stat: "48 Units", action: "Telemetry Diagnostics", badge: "Optimal", icon: "🚜" },
      { title: "Tippers & Transit Mixers", subtitle: "Kolhapur & Hubali Hubs", stat: "74 Units", action: "Maintenance Logs", badge: "Active", icon: "🚛" },
      { title: "Machinery Breakdown Alerts", subtitle: "Pune Sector 2 Excavator #12", stat: "1 Unit Down", action: "Dispatch Mechanic", badge: "Critical", icon: "⚠️" },
      { title: "GPS Tracking & Geofencing", subtitle: "Fuel Tanker Fleet #04", stat: "Active Route", action: "Track Live", badge: "Secure", icon: "🛰️" }
    ],
    fuel: [
      { title: "Bulk Diesel Inventory", subtitle: "Hubali & Kolhapur Storage Tanks", stat: "1,45,000 Ltrs", action: "Refuel Requisition", badge: "Stable", icon: "⛽" },
      { title: "Daily Fuel Burn Rate", subtitle: "Heavy Machinery Fleet Consumption", stat: "12,400 Ltrs/Day", action: "Efficiency Audit", badge: "Normal", icon: "📊" },
      { title: "Fuel Purchase Orders", subtitle: "HPCL Quarterly Bulk Contract #412", stat: "₹3.8 Cr", action: "Approve Invoice", badge: "Pending", icon: "💳" },
      { title: "Siphoning & Theft Alerts", subtitle: "Kolhapur Central Yard Sensor #3", stat: "0 Incidents", action: "View Logs", badge: "Secure", icon: "🔒" }
    ],
    material: [
      { title: "VG-30 Bitumen Stock", subtitle: "Central Warehouse Kolhapur", stat: "310 Metric Tons", action: "Inventory Check", badge: "Sufficient", icon: "🛢️" },
      { title: "OPC Cement Grade 53", subtitle: "All Site Yards Storage", stat: "2,400 Bags", action: "Procurement Log", badge: "Normal", icon: "🧱" },
      { title: "Steel TMT Fe500D", subtitle: "Elevated Corridor Requirements", stat: "450 Tons", action: "Reorder Stock", badge: "Low Stock", icon: "🏗️" },
      { title: "Custom 3D Keychains & Assets", subtitle: "Foshe Merch Supply", stat: "Received", action: "View Catalog", badge: "Delivered", icon: "🎁" }
    ],
    workforce: [
      { title: "Total On-Site Deployed Labor", subtitle: "Across 6 Highway & Corridor Sites", stat: "1,290 Workers", action: "Attendance Audit", badge: "Active", icon: "👷" },
      { title: "Engineers & Supervisory Staff", subtitle: "Technical Leads & Site Incharges", stat: "184 Personnel", action: "Payroll Review", badge: "Verified", icon: "👔" },
      { title: "Overtime & Shift Allowance", subtitle: "Night Shift Ghat Stabilization Crews", stat: "₹42.5 L", action: "Sign-off Ledger", badge: "Pending", icon: "🌙" },
      { title: "Biometric Attendance Sync", subtitle: "Kolhapur & Hubali Terminals", stat: "96.5%", action: "View Logs", badge: "Connected", icon: "⏱️" }
    ],
    ess: [
      { title: "Director's Executive Profile", subtitle: "Sushant • MD Infrastructure Pvt Ltd", stat: "Level 1 Access", action: "View Credentials", badge: "Active", icon: "👑" },
      { title: "Leave & Travel Requisitions", subtitle: "Goa Coastal Retreat & Board Meetings", stat: "2 Requests", action: "Approve Travel", badge: "Pending", icon: "✈️" },
      { title: "Corporate Expense Reimbursement", subtitle: "Q2 Travel & Client Board Dinners", stat: "₹1,42,500", action: "Audit Ledger", badge: "Submitted", icon: "🧾" },
      { title: "Tax & Financial Records", subtitle: "Saraswat Bank & Udyam MSME Registry", stat: "Verified", action: "View Vault", badge: "Secure", icon: "🏛️" }
    ],
    vendor: [
      { title: "Subcontractor Payables Queue", subtitle: "Excellence Infra & Paving Partners", stat: "₹14.2 Cr", action: "Release Payment", badge: "Urgent", icon: "💸" },
      { title: "Vendor GST Compliance Audits", subtitle: "Input Tax Credit (ITC) Verification", stat: "98% Compliant", action: "View GST Logs", badge: "Verified", icon: "🧾" },
      { title: "Retention Money Ledger", subtitle: "NHAI Contractual Retentions", stat: "₹31.5 Cr", action: "Audit Bank Guarantees", badge: "Secure", icon: "🏦" },
      { title: "Property Purchase Escrow", subtitle: "Rajarampuri Property Transfer, Kolhapur", stat: "Processing", action: "Coordinate Bank", badge: "Active", icon: "🏠" }
    ],
    project: [
      { title: "Joint Measurement Records (JMR)", subtitle: "Hubali & Tumkuru Progress Records", stat: "₹36.2 Cr Value", action: "Sign JMR Record", badge: "Pending", icon: "📑" },
      { title: "Quality Control Test Results", subtitle: "Cube Compressive Strength & Core Tests", stat: "1,420 Passed", action: "View Lab Reports", badge: "Optimal", icon: "🔬" },
      { title: "Non-Conformance Reports (NCR)", subtitle: "Tumkuru Drainage Sector 3", stat: "7 Open NCRs", action: "Resolve NCR", badge: "Critical", icon: "⚠️" },
      { title: "SwanSAT Logo & Asset Trademark", subtitle: "Brand Identity Legal Ownership", stat: "Registered", action: "View Docs", badge: "Protected", icon: "®️" }
    ],
    safety: [
      { title: "Days Without Lost Time Injury (LTI)", subtitle: "Enterprise Safety Record", stat: "310 Days", action: "Safety Audit Log", badge: "Excellent", icon: "🛡️" },
      { title: "High-Visibility Gear & PPE", subtitle: "Expressway Sec IV Workforce", stat: "98% Compliant", action: "Inspect Site", badge: "Normal", icon: "🦺" },
      { title: "Near-Miss Incident Reports", subtitle: "Ghat Section Vele Sector 7", stat: "2 Reports", action: "Review Mitigation", badge: "Attention", icon: "🚨" },
      { title: "Indiahikes High-Altitude Protocol", subtitle: "Gaumukh Tapovan Expedition Safety", stat: "Completed", action: "View Certificate", badge: "Passed", icon: "🏔️" }
    ],
    reporting: [
      { title: "Director's Boardroom Monthly PDF", subtitle: "Comprehensive P&L, Cashflow & Progress", stat: "Generated Today", action: "Download PDF", badge: "Ready", icon: "📄" },
      { title: "NHAI Compliance & Audit Dossier", subtitle: "Quarterly Statutory Submission", stat: "Q2 Filed", action: "View Dossier", badge: "Completed", icon: "📁" },
      { title: "AI Predictive Analytics Suite", subtitle: "Margin Variance & Schedule Risk Forecast", stat: "98.4% Accuracy", action: "Run Simulation", badge: "Active", icon: "📈" },
      { title: "Personal Care & Herbals Audit", subtitle: "Rosemary & Sandalwood Inventory", stat: "Stock OK", action: "View Report", badge: "Verified", icon: "🌿" }
    ]
  };

  // All 6 project sites fully implemented with complete Director-level boardroom data
  const allSites = [
    {
      id: 1,
      zone: "South Zone",
      name: "Hubali",
      type: "Package 2 • National Highway",
      status: "On Track",
      health: "HEALTHY",
      financialStatus: "In Profit",
      profitStatusClass: "bg-emerald-100 text-emerald-900 font-extrabold border border-emerald-300",
      risk: "profitable",
      statusClass: "bg-emerald-100 text-emerald-900 font-extrabold",
      progress: 76,
      progressColor: "bg-[#137333]",
      budget: "₹240.0 Cr",
      contractValue: "₹240.0 Cr",
      received: "₹162.0 Cr",
      expectedProfit: "₹38.5 Cr",
      startDate: "Jan 2024",
      endDate: "Mar 2027",
      expenditure: "₹184.0 Cr",
      billed: "₹162.0 Cr",
      unbilled: "₹22.0 Cr",
      aiRecommendation: "Expedite pending JMR sign-off with NHAI Director to unlock ₹22 Cr unbilled cashflow. Schedule executive breakfast with NHAI Regional Head.",
      location: "Hubali Bypass Section, NH-66 Chainage 42",
      coordinates: "15.3647° N, 75.1240° E",
      pm: "Rahul Deshmukh",
      pmPhone: "+91 98231 44551",
      mdiEntity: "MDI Private Limited - Hubali SPV",
      lastUpdated: "Today, 11:30 AM",
      executiveSummary: "Project is moving strongly with 76% physical progress. Billing and collections are healthy, though ₹22 Cr remains unbilled pending NHAI JMR sign-off.",
      boqStatus: "Earthwork 92% Complete, Structures 78% Complete, Paving 65% Complete.",
      courierStages: [
        { stage: "Mobilization & Survey", status: "Completed", date: "Jan 2024", deadline: "Feb 15, 2024" },
        { stage: "Earthwork & Site Clearance", status: "Completed", date: "Jun 2024", deadline: "Jul 30, 2024" },
        { stage: "Sub-base & Foundations", status: "Completed", date: "Dec 2024", deadline: "Jan 10, 2025" },
        { stage: "Structures & Piling", status: "In Progress", date: "Active", deadline: "Nov 30, 2025" },
        { stage: "Bituminous Paving", status: "Upcoming", date: "Q4 2026", deadline: "Aug 15, 2026" },
        { stage: "Toll Plaza & Handover", status: "Pending", date: "Mar 2027", deadline: "Mar 31, 2027" }
      ],
      boqSubtasksFinancial: [
        { task: "Earthwork & Site Clearance", budget: "₹45.0 Cr", spent: "₹40.2 Cr", status: "Optimal" },
        { task: "Sub-base & Granular Sub-base", budget: "₹65.0 Cr", spent: "₹58.0 Cr", status: "Optimal" },
        { task: "Bituminous Concrete (BC/DBM)", budget: "₹80.0 Cr", spent: "₹61.5 Cr", status: "In Progress" },
        { task: "Drainage & Safety Barriers", budget: "₹50.0 Cr", spent: "₹24.3 Cr", status: "On Track" }
      ],
      boqSubtasksCompletion: [
        { task: "Earthwork & Site Clearance", planned: "95%", actual: "92%", variance: "-3%" },
        { task: "Sub-base & Granular Sub-base", planned: "85%", actual: "88%", variance: "+3%" },
        { task: "Bituminous Concrete (BC/DBM)", planned: "70%", actual: "65%", variance: "-5%" },
        { task: "Drainage & Safety Barriers", planned: "50%", actual: "52%", variance: "+2%" }
      ],
      concernedTeam: [
        { role: "Project Director", name: "Vikramaditya More", phone: "+91 98231 11220", email: "vikram.more@mdinfra.com" },
        { role: "Project Manager", name: "Rahul Deshmukh", phone: "+91 98231 44551", email: "rahul.deshmukh@mdinfra.com" },
        { role: "Chief Resident Engineer", name: "Suresh Patil", phone: "+91 98221 55667", email: "suresh.patil@mdinfra.com" },
        { role: "Head of Accounts", name: "Anant Kulkarni", phone: "+91 98332 11223", email: "anant.kulkarni@mdinfra.com" },
        { role: "Quality Assurance Lead", name: "Prakash Shinde", phone: "+91 98112 33445", email: "prakash.shinde@mdinfra.com" },
        { role: "Safety Director", name: "Meera Nair", phone: "+91 98554 22112", email: "meera.nair@mdinfra.com" },
        { role: "Procurement Head", name: "Ajay Ghorpade", phone: "+91 98771 33445", email: "ajay.ghorpade@mdinfra.com" },
        { role: "Legal & Compliance Head", name: "Adv. Sunita Rane", phone: "+91 98991 22334", email: "sunita.rane@mdinfra.com" }
      ],
      pendencies: [
        { item: "NHAI JMR Certification for Sector 2", impact: "₹22.0 Cr Unbilled Revenue", deadline: "Sept 15, 2026", action: "Director Sign-off Required" },
        { item: "Electrical Utility Shifting Clearance", impact: "10-day delay risk", deadline: "Sept 20, 2026", action: "Escalate to MSEDCL" }
      ],
      plData: { revenue: "₹240.0 Cr", directCost: "₹142.0 Cr", indirectCost: "₹42.0 Cr", totalCost: "₹184.0 Cr", grossProfit: "₹56.0 Cr", grossMargin: "23.3%" }
    },
    {
      id: 2,
      zone: "South Zone",
      name: "Tumkuru",
      type: "State Highway Corridor",
      status: "Critical Loss",
      health: "CRITICAL",
      financialStatus: "In Loss",
      profitStatusClass: "bg-red-100 text-red-900 font-extrabold border border-red-300",
      risk: "loss",
      statusClass: "bg-red-100 text-red-900 font-extrabold",
      progress: 42,
      progressColor: "bg-red-600",
      budget: "₹150.0 Cr",
      contractValue: "₹150.0 Cr",
      received: "₹75.0 Cr",
      expectedProfit: "-₹12.0 Cr",
      startDate: "May 2024",
      endDate: "Jun 2027",
      expenditure: "₹112.0 Cr",
      billed: "₹75.0 Cr",
      unbilled: "₹14.0 Cr",
      aiRecommendation: "Critical loss detected due to cost overrun. Restructure subcontractor rates immediately and replace underperforming site procurement head.",
      location: "Tumkuru Outer Corridor, Sector 3",
      coordinates: "13.3379° N, 77.1173° E",
      pm: "Sameer Joshi",
      pmPhone: "+91 98221 33441",
      mdiEntity: "MDI Private Limited - Tumkuru Division",
      lastUpdated: "Today, 09:15 AM",
      executiveSummary: "Severe margin erosion due to unbudgeted sub-base remediation costs and delay penalties. Immediate subcontractor restructuring required.",
      boqStatus: "Sub-base works stalled at 42%. Drainage packages delayed by 6 weeks.",
      courierStages: [
        { stage: "Mobilization & Survey", status: "Completed", date: "May 2024", deadline: "Jun 10, 2024" },
        { stage: "Earthwork & Excavation", status: "Delayed", date: "Incomplete", deadline: "Oct 15, 2024" },
        { stage: "Sub-base Remediation", status: "In Progress", date: "Delayed", deadline: "May 30, 2025" },
        { stage: "Drainage Infrastructure", status: "Pending", date: "On Hold", deadline: "Nov 30, 2026" },
        { stage: "Surface Wearing Course", status: "Pending", date: "Future", deadline: "Jun 30, 2027" }
      ],
      boqSubtasksFinancial: [
        { task: "Earthwork & Excavation", budget: "₹40.0 Cr", spent: "₹45.5 Cr", status: "Over Budget" },
        { task: "Sub-base Remediation", budget: "₹50.0 Cr", spent: "₹52.0 Cr", status: "Critical" },
        { task: "Drainage Infrastructure", budget: "₹60.0 Cr", spent: "₹14.5 Cr", status: "Delayed" }
      ],
      boqSubtasksCompletion: [
        { task: "Earthwork & Excavation", planned: "80%", actual: "50%", variance: "-30%" },
        { task: "Sub-base Remediation", planned: "70%", actual: "42%", variance: "-28%" },
        { task: "Drainage Infrastructure", planned: "45%", actual: "25%", variance: "-20%" }
      ],
      concernedTeam: [
        { role: "Project Director", name: "Vikramaditya More", phone: "+91 98231 11220", email: "vikram.more@mdinfra.com" },
        { role: "Project Manager", name: "Sameer Joshi", phone: "+91 98221 33441", email: "sameer.joshi@mdinfra.com" },
        { role: "Commercial Lead", name: "Vikas Mane", phone: "+91 98441 22334", email: "vikas.mane@mdinfra.com" },
        { role: "Site Engineer", name: "Kishore Rao", phone: "+91 98112 77889", email: "kishore.rao@mdinfra.com" },
        { role: "Safety Officer", name: "Santosh Kumar", phone: "+91 98334 55667", email: "santosh.kumar@mdinfra.com" },
        { role: "Contracts Auditor", name: "Rohan Deshmukh", phone: "+91 98551 22334", email: "rohan.deshmukh@mdinfra.com" }
      ],
      pendencies: [
        { item: "Subcontractor Rate Restructuring & Penalty Waiver", impact: "₹12.0 Cr Projected Loss", deadline: "Sept 10, 2026", action: "Authorize Renegotiation" },
        { item: "Geotechnical Re-survey Approval", impact: "Sub-base stability", deadline: "Sept 12, 2026", action: "Review Consultant Report" }
      ],
      plData: { revenue: "₹150.0 Cr", directCost: "₹88.0 Cr", indirectCost: "₹24.0 Cr", totalCost: "₹112.0 Cr", grossProfit: "-₹8.0 Cr", grossMargin: "-5.3%" }
    },
    {
      id: 3,
      zone: "South Zone",
      name: "Goa",
      type: "Coastal Highway Project",
      status: "Moderate Risk",
      health: "ATTENTION",
      financialStatus: "Moderate Situation",
      profitStatusClass: "bg-amber-100 text-amber-900 font-extrabold border border-amber-300",
      risk: "moderate",
      statusClass: "bg-amber-100 text-amber-900 font-extrabold",
      progress: 61,
      progressColor: "bg-amber-500",
      budget: "₹190.0 Cr",
      contractValue: "₹190.0 Cr",
      received: "₹98.0 Cr",
      expectedProfit: "₹18.2 Cr",
      startDate: "Mar 2024",
      endDate: "Jan 2028",
      expenditure: "₹110.0 Cr",
      billed: "₹98.0 Cr",
      unbilled: "₹12.0 Cr",
      aiRecommendation: "Deploy 2 additional excavators to stabilize coastal embankment before monsoon surges.",
      location: "Goa Coastal Highway Sector 4",
      coordinates: "15.2993° N, 74.1240° E",
      pm: "Kiran Prabhu",
      pmPhone: "+91 98331 11223",
      mdiEntity: "MDI Private Limited - Goa Coastal SPV",
      lastUpdated: "Yesterday, 04:45 PM",
      executiveSummary: "Coastal erosion threats and squalls require proactive slope stabilization. Overall financial health remains stable.",
      boqStatus: "Embankment pitching at 61%. Bridge foundations completed.",
      courierStages: [
        { stage: "Mobilization & Survey", status: "Completed", date: "Mar 2024", deadline: "Apr 30, 2024" },
        { stage: "Bridge Foundations", status: "Completed", date: "Jan 2025", deadline: "Jan 15, 2025" },
        { stage: "Embankment Pitching", status: "In Progress", date: "Active", deadline: "Nov 30, 2026" },
        { stage: "Coastal Retaining Wall", status: "In Progress", date: "Active", deadline: "Aug 30, 2027" },
        { stage: "Final Surfacing", status: "Pending", date: "Q3 2027", deadline: "Jan 15, 2028" }
      ],
      boqSubtasksFinancial: [
        { task: "Embankment Pitching", budget: "₹80.0 Cr", spent: "₹48.0 Cr", status: "On Track" },
        { task: "Bridge Foundations", budget: "₹70.0 Cr", spent: "₹45.0 Cr", status: "Optimal" },
        { task: "Coastal Retaining Wall", budget: "₹40.0 Cr", spent: "₹17.0 Cr", status: "Attention" }
      ],
      boqSubtasksCompletion: [
        { task: "Embankment Pitching", planned: "65%", actual: "61%", variance: "-4%" },
        { task: "Bridge Foundations", planned: "90%", actual: "92%", variance: "+2%" },
        { task: "Coastal Retaining Wall", planned: "55%", actual: "50%", variance: "-5%" }
      ],
      concernedTeam: [
        { role: "Project Director", name: "Vikramaditya More", phone: "+91 98231 11220", email: "vikram.more@mdinfra.com" },
        { role: "Project Manager", name: "Kiran Prabhu", phone: "+91 98331 11223", email: "kiran.prabhu@mdinfra.com" },
        { role: "Marine Structural Engineer", name: "Anthony D'Souza", phone: "+91 98223 44556", email: "anthony.dsouza@mdinfra.com" },
        { role: "Site Procurement", name: "Deepak Naik", phone: "+91 98114 33221", email: "deepak.naik@mdinfra.com" },
        { role: "Environmental Compliance", name: "Dr. Rohini Kulkarni", phone: "+91 98441 55667", email: "rohini.kulkarni@mdinfra.com" }
      ],
      pendencies: [
        { item: "Deploy 2 Additional Heavy Excavators", impact: "Monsoon Embankment Protection", deadline: "Sept 12, 2026", action: "Approve Capex" }
      ],
      plData: { revenue: "₹190.0 Cr", directCost: "₹72.0 Cr", indirectCost: "₹38.0 Cr", totalCost: "₹110.0 Cr", grossProfit: "₹32.0 Cr", grossMargin: "16.8%" }
    },
    {
      id: 4,
      zone: "North Zone",
      name: "Satara",
      type: "Urban Elevated Structure",
      status: "On Track",
      health: "HEALTHY",
      financialStatus: "In Profit",
      profitStatusClass: "bg-emerald-100 text-emerald-900 font-extrabold border border-emerald-300",
      risk: "profitable",
      statusClass: "bg-emerald-100 text-emerald-900 font-extrabold",
      progress: 82,
      progressColor: "bg-[#137333]",
      budget: "₹120.0 Cr",
      contractValue: "₹120.0 Cr",
      received: "₹80.2 Cr",
      expectedProfit: "₹21.0 Cr",
      startDate: "Aug 2024",
      endDate: "Dec 2027",
      expenditure: "₹85.0 Cr",
      billed: "₹80.2 Cr",
      unbilled: "₹4.8 Cr",
      aiRecommendation: "Shift surplus equipment to Vele sector to accelerate pier foundation casting speed.",
      location: "Satara Intersection IV",
      coordinates: "17.6805° N, 74.0183° E",
      pm: "Vikram Kadam",
      pmPhone: "+91 98111 22331",
      mdiEntity: "MDI Private Limited - Satara Division",
      lastUpdated: "Today, 10:00 AM",
      executiveSummary: "High performance urban elevated structure package. Operating ahead of schedule with robust margins.",
      boqStatus: "Pier caps 90% Done, Span erection 82% Done.",
      courierStages: [
        { stage: "Mobilization & Survey", status: "Completed", date: "Aug 2024", deadline: "Sep 30, 2024" },
        { stage: "Piling & Foundations", status: "Completed", date: "Nov 2024", deadline: "Dec 15, 2024" },
        { stage: "Pier Caps & Girder Casting", status: "In Progress", date: "Active", deadline: "Oct 30, 2026" },
        { stage: "Deck Slab & Parapet", status: "In Progress", date: "Active", deadline: "Aug 15, 2027" },
        { stage: "Load Testing & Handover", status: "Pending", date: "Dec 2027", deadline: "Dec 31, 2027" }
      ],
      boqSubtasksFinancial: [
        { task: "Piling & Foundations", budget: "₹40.0 Cr", spent: "₹28.0 Cr", status: "Optimal" },
        { task: "Pier Caps & Girder Casting", budget: "₹50.0 Cr", spent: "₹37.0 Cr", status: "Optimal" },
        { task: "Deck Slab & Parapet", budget: "₹30.0 Cr", spent: "₹20.0 Cr", status: "Ahead" }
      ],
      boqSubtasksCompletion: [
        { task: "Piling & Foundations", planned: "95%", actual: "98%", variance: "+3%" },
        { task: "Pier Caps & Girder Casting", planned: "85%", actual: "90%", variance: "+5%" },
        { task: "Deck Slab & Parapet", planned: "75%", actual: "82%", variance: "+7%" }
      ],
      concernedTeam: [
        { role: "Project Director", name: "Vikramaditya More", phone: "+91 98231 11220", email: "vikram.more@mdinfra.com" },
        { role: "Project Manager", name: "Vikram Kadam", phone: "+91 98111 22331", email: "vikram.kadam@mdinfra.com" },
        { role: "Structural Lead", name: "Sandeep More", phone: "+91 98221 99887", email: "sandeep.more@mdinfra.com" },
        { role: "Safety Supervisor", name: "Govind Jadhav", phone: "+91 98333 44112", email: "govind.jadhav@mdinfra.com" },
        { role: "Quality Controller", name: "Nitin Sawant", phone: "+91 98552 11223", email: "nitin.sawant@mdinfra.com" }
      ],
      pendencies: [
        { item: "Authorize Equipment Transfer to Vele", impact: "Network optimization", deadline: "Sept 18, 2026", action: "Approve Transfer" }
      ],
      plData: { revenue: "₹120.0 Cr", directCost: "₹56.0 Cr", indirectCost: "₹29.0 Cr", totalCost: "₹85.0 Cr", grossProfit: "₹24.0 Cr", grossMargin: "20.0%" }
    },
    {
      id: 5,
      zone: "North Zone",
      name: "Vele",
      type: "High-Speed Freight Corridor",
      status: "Moderate Risk",
      health: "ATTENTION",
      financialStatus: "Moderate Situation",
      profitStatusClass: "bg-amber-100 text-amber-900 font-extrabold border border-amber-300",
      risk: "moderate",
      statusClass: "bg-amber-100 text-amber-900 font-extrabold",
      progress: 54,
      progressColor: "bg-amber-500",
      budget: "₹180.0 Cr",
      contractValue: "₹180.0 Cr",
      received: "₹88.0 Cr",
      expectedProfit: "₹14.5 Cr",
      startDate: "Feb 2024",
      endDate: "Jan 2028",
      expenditure: "₹95.0 Cr",
      billed: "₹88.0 Cr",
      unbilled: "₹7.0 Cr",
      aiRecommendation: "Authorize overnight slope stabilization contractor shift to prevent schedule slippage.",
      location: "Vele Ghat Section Sector 7",
      coordinates: "18.2140° N, 73.8320° E",
      pm: "Nilesh Kulkarni",
      pmPhone: "+91 98222 11223",
      mdiEntity: "MDI Private Limited - Vele Corridor SPV",
      lastUpdated: "Yesterday, 06:15 PM",
      executiveSummary: "Ghat section challenges causing moderate schedule friction. Night shifts recommended.",
      boqStatus: "Tunnel boring 54% Done, Slope protection 48% Done.",
      courierStages: [
        { stage: "Mobilization & Survey", status: "Completed", date: "Feb 2024", deadline: "Mar 30, 2024" },
        { stage: "Access Road Construction", status: "Completed", date: "Sep 2024", deadline: "Oct 15, 2024" },
        { stage: "Tunnel Excavation & Boring", status: "In Progress", date: "Active", deadline: "May 30, 2027" },
        { stage: "Ghat Slope Protection", status: "In Progress", date: "Active", deadline: "Oct 30, 2027" },
        { stage: "Trackbed & Electrification", status: "Pending", date: "Future", deadline: "Jan 15, 2028" }
      ],
      boqSubtasksFinancial: [
        { task: "Tunnel Excavation & Boring", budget: "₹100.0 Cr", spent: "₹55.0 Cr", status: "On Track" },
        { task: "Ghat Slope Protection", budget: "₹80.0 Cr", spent: "₹40.0 Cr", status: "Attention" }
      ],
      boqSubtasksCompletion: [
        { task: "Tunnel Excavation & Boring", planned: "60%", actual: "54%", variance: "-6%" },
        { task: "Ghat Slope Protection", planned: "50%", actual: "48%", variance: "-2%" }
      ],
      concernedTeam: [
        { role: "Project Director", name: "Vikramaditya More", phone: "+91 98231 11220", email: "vikram.more@mdinfra.com" },
        { role: "Project Manager", name: "Nilesh Kulkarni", phone: "+91 98222 11223", email: "nilesh.kulkarni@mdinfra.com" },
        { role: "Tunnel Specialist", name: "Rajesh Gaikwad", phone: "+91 98441 12233", email: "rajesh.gaikwad@mdinfra.com" },
        { role: "Geologist", name: "Dr. Arvind Joshi", phone: "+91 98115 66778", email: "arvind.joshi@mdinfra.com" },
        { role: "Safety Lead", name: "Vijay Shinde", phone: "+91 98334 11220", email: "vijay.shinde@mdinfra.com" }
      ],
      pendencies: [
        { item: "Night Shift Contractor Authorization", impact: "Schedule recovery", deadline: "Sept 14, 2026", action: "Approve Shift" }
      ],
      plData: { revenue: "₹180.0 Cr", directCost: "₹64.0 Cr", indirectCost: "₹31.0 Cr", totalCost: "₹95.0 Cr", grossProfit: "₹22.0 Cr", grossMargin: "12.2%" }
    },
    {
      id: 6,
      zone: "North Zone",
      name: "Pune",
      type: "Expressway Expansion",
      status: "Critical Loss",
      health: "CRITICAL",
      financialStatus: "In Loss",
      profitStatusClass: "bg-red-100 text-red-900 font-extrabold border border-red-300",
      risk: "loss",
      statusClass: "bg-red-100 text-red-900 font-extrabold",
      progress: 35,
      progressColor: "bg-red-600",
      budget: "₹310.0 Cr",
      contractValue: "₹310.0 Cr",
      received: "₹95.0 Cr",
      expectedProfit: "-₹18.5 Cr",
      startDate: "Jan 2025",
      endDate: "Dec 2028",
      expenditure: "₹140.0 Cr",
      billed: "₹95.0 Cr",
      unbilled: "₹18.0 Cr",
      aiRecommendation: "Urgent audit required on material wastage and equipment downtime in Pune sector.",
      location: "Pune Expressway Corridor Sector 2",
      coordinates: "18.5204° N, 73.8567° E",
      pm: "Aniket Shinde",
      pmPhone: "+91 98444 55667",
      mdiEntity: "MDI Private Limited - Pune Expressway SPV",
      lastUpdated: "Today, 08:30 AM",
      executiveSummary: "Substantial delay on land acquisition clearances and idle machinery costs impacting overall enterprise P&L.",
      boqStatus: "Excavation 35% Done, Right-of-Way clearances pending.",
      courierStages: [
        { stage: "Mobilization & Survey", status: "Completed", date: "Jan 2025", deadline: "Feb 28, 2025" },
        { stage: "Land Acquisition & Clearing", status: "Delayed", date: "Pending", deadline: "Dec 30, 2025" },
        { stage: "Widening & Sub-grade", status: "In Progress", date: "Delayed", deadline: "Aug 30, 2027" },
        { stage: "Interchange Structures", status: "Pending", date: "On Hold", deadline: "Jun 30, 2028" },
        { stage: "Final Commissioning", status: "Pending", date: "Future", deadline: "Dec 31, 2028" }
      ],
      boqSubtasksFinancial: [
        { task: "Land Acquisition & Clearing", budget: "₹150.0 Cr", spent: "₹80.0 Cr", status: "Critical" },
        { task: "Widening & Sub-grade", budget: "₹160.0 Cr", spent: "₹60.0 Cr", status: "Delayed" }
      ],
      boqSubtasksCompletion: [
        { task: "Land Acquisition & Clearing", planned: "70%", actual: "35%", variance: "-35%" },
        { task: "Widening & Sub-grade", planned: "50%", actual: "35%", variance: "-15%" }
      ],
      concernedTeam: [
        { role: "Project Director", name: "Vikramaditya More", phone: "+91 98231 11220", email: "vikram.more@mdinfra.com" },
        { role: "Project Manager", name: "Aniket Shinde", phone: "+91 98444 55667", email: "aniket.shinde@mdinfra.com" },
        { role: "Legal & Land Officer", name: "Adv. Milind Deshpande", phone: "+91 98224 55667", email: "milind.deshpande@mdinfra.com" },
        { role: "Plant & Equipment Head", name: "Subhash Kale", phone: "+91 98332 99001", email: "subhash.kale@mdinfra.com" },
        { role: "Audit & Risk Lead", name: "Hemant Joshi", phone: "+91 98551 33221", email: "hemant.joshi@mdinfra.com" }
      ],
      pendencies: [
        { item: "Urgent Audit on Material Wastage & Equipment Downtime", impact: "₹18.5 Cr Exposure", deadline: "Sept 8, 2026", action: "Initiate Audit" }
      ],
      plData: { revenue: "₹310.0 Cr", directCost: "₹96.0 Cr", indirectCost: "₹44.0 Cr", totalCost: "₹140.0 Cr", grossProfit: "-₹14.0 Cr", grossMargin: "-4.5%" }
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-900 selection:bg-[#af2024] selection:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; background-color: #f8fafc; color: #0f172a; }
        
        @keyframes marquee { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        @keyframes android-fade-in { from { opacity: 0; transform: translateY(12px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes android-slide-right { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }

        .animate-marquee { display: inline-block; animation: marquee 25s linear infinite; }
        .android-card-transition { transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .android-card-transition:hover { transform: translateY(-2px); box-shadow: 0 14px 30px -10px rgba(15, 23, 42, 0.1); }
        .android-modal-enter { animation: android-fade-in 0.25s cubic-bezier(0.1, 0.9, 0.2, 1) forwards; }
        .android-slide-enter { animation: android-slide-right 0.3s cubic-bezier(0.1, 0.9, 0.2, 1) forwards; }
        
        .rotating-asterisk {
          animation: rotate-asterisk 3s linear infinite;
          display: inline-block;
        }

        .glass-button {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(203, 213, 225, 1);
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.05);
          transition: all 0.2s ease;
        }
        .glass-button:hover {
          background: rgba(241, 245, 249, 1);
          border-color: rgba(100, 116, 139, 1);
          transform: translateY(-1px);
        }
      `}</style>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl text-[14px] font-bold border border-white/10 android-modal-enter flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#af2024] animate-ping"></span>
          {toastMessage}
        </div>
      )}

      {/* CCTV Video Popup Modal */}
      {activeVideoUrl && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 android-modal-enter">
          <div className="bg-white text-slate-900 border border-slate-300 rounded-[28px] max-w-3xl w-full p-6 shadow-2xl relative">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200 mb-4">
              <h3 className="text-[18px] font-extrabold flex items-center gap-2 text-slate-900">
                <span>📹</span> Live Stream: {activeVideoTitle}
              </h3>
              <button onClick={() => setActiveVideoUrl(null)} className="w-9 h-9 rounded-full glass-button flex items-center justify-center font-bold text-slate-900 cursor-pointer">✕</button>
            </div>
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-inner flex items-center justify-center relative">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/B1zCgR1AdCs?autoplay=1" 
                title="CCTV Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4 flex justify-between items-center text-[13px] font-semibold text-slate-600">
              <span>Status: Secure 4K Stream • Latency: 12ms</span>
              <button onClick={() => setActiveVideoUrl(null)} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold cursor-pointer hover:bg-black transition">Close Stream</button>
            </div>
          </div>
        </div>
      )}

      {/* Drill-down Audit Verification Modal */}
      {drilldownModalData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 border border-slate-300 rounded-[28px] max-w-xl w-full p-7 shadow-2xl android-modal-enter">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <h3 className="text-[18px] font-extrabold flex items-center gap-2 text-slate-900">
                <span>🔍</span> Audit & Calculation Breakdown: {drilldownModalData.title}
              </h3>
              <button onClick={() => setDrilldownModalData(null)} className="w-9 h-9 rounded-full glass-button flex items-center justify-center font-bold text-slate-900">✕</button>
            </div>
            <div className="my-5 flex flex-col gap-4 text-[14px]">
              <p className="text-slate-700 font-semibold">Verified calculation methodology & real-time telemetry source logs:</p>
              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 font-mono text-[13px] leading-relaxed text-slate-900 font-bold">
                {drilldownModalData.formula}
              </div>
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-[13.5px]">
                <div className="font-bold text-emerald-900 mb-1">Source Authentication:</div>
                <p className="text-emerald-900 font-semibold">Verified against ERP database ledger and NHAI JMR certification registers as of September 2026.</p>
              </div>
            </div>
            <button onClick={() => setDrilldownModalData(null)} className="w-full py-3.5 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-bold text-[14px] cursor-pointer transition">
              Close Audit Window
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modal 1: Check Weather Arrangements */}
      {showArrangementModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 border border-slate-300 rounded-[28px] max-w-lg w-full p-7 shadow-2xl android-modal-enter">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <h3 className="text-[18px] font-extrabold flex items-center gap-2 text-slate-900">
                <span>🛡️</span> Emergency Weather Action Protocol: {arrangementSite}
              </h3>
              <button onClick={() => setShowArrangementModal(false)} className="w-9 h-9 rounded-full glass-button flex items-center justify-center font-bold text-slate-900">✕</button>
            </div>
            <div className="my-5 flex flex-col gap-4 text-[13.5px]">
              <p className="text-slate-700 font-semibold">Deploying automated drainage pumps and notifying site supervisors at <b>{arrangementSite}</b>.</p>
              <div className="p-4 bg-orange-50 border border-orange-300 rounded-2xl">
                <div className="font-bold text-orange-900 mb-1">Checklist Verified:</div>
                <ul className="list-disc pl-5 flex flex-col gap-1 text-[13px] text-orange-900 font-semibold">
                  <li>Tarpaulin covers secured over sub-base</li>
                  <li>Emergency diesel pumps primed & fueled</li>
                  <li>Evacuation route clear for heavy machinery</li>
                </ul>
              </div>
            </div>
            <button onClick={() => { triggerToast(`✅ Emergency protocols successfully executed for ${arrangementSite}!`); setShowArrangementModal(false); }} className="w-full py-3.5 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-bold text-[14px] cursor-pointer shadow-lg shadow-[#af2024]/20 transition">
              Confirm Site Lockdown ⚡
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modal 2: Share Trip with Driver */}
      {showDriverModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-[28px] max-w-lg w-full p-7 shadow-2xl android-modal-enter border border-slate-300">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <h3 className="text-[18px] font-extrabold flex items-center gap-2 text-slate-900">
                <span>📲</span> Dispatch Trip Details to Driver
              </h3>
              <button onClick={() => setShowDriverModal(false)} className="w-9 h-9 rounded-full glass-button flex items-center justify-center font-bold text-slate-900">✕</button>
            </div>
            <div className="my-5 flex flex-col gap-4 text-[13.5px]">
              <div className="p-4 bg-slate-100 border border-slate-300 rounded-2xl">
                <div className="text-[11.5px] font-bold text-slate-700 uppercase tracking-wider mb-1">SMS / WhatsApp Dispatch Payload</div>
                <p className="text-[14px] font-bold text-slate-900">"Director Sushant's Route: HQ Kolhapur to Hubali Site 1 via NH48 Bypass. Estimated travel time: 42 mins. Please await at VIP parking gate."</p>
              </div>
              <div>
                <label className="text-[11.5px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Select Driver Contact</label>
                <select className="w-full p-3.5 rounded-2xl border border-slate-300 bg-white text-slate-900 text-[14px] font-semibold outline-none">
                  <option>Ramesh Patil (+91 98221 11223)</option>
                  <option>Sunil Shinde (+91 98334 44556)</option>
                </select>
              </div>
            </div>
            <button onClick={() => { triggerToast("📲 Dispatch SMS & GPS Route successfully sent to driver!"); setShowDriverModal(false); }} className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-[14px] cursor-pointer transition shadow-sm">
              Send Route Now 🚀
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modal 3: Raise Material Query */}
      {showQueryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 border border-slate-300 rounded-[28px] max-w-lg w-full p-7 shadow-2xl android-modal-enter">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <h3 className="text-[18px] font-extrabold flex items-center gap-2 text-slate-900">
                <span>❓</span> Raise Procurement & Inventory Query
              </h3>
              <button onClick={() => setShowQueryModal(false)} className="w-9 h-9 rounded-full glass-button flex items-center justify-center font-bold text-slate-900">✕</button>
            </div>
            <div className="my-5 flex flex-col gap-4 text-[13.5px]">
              <div>
                <label className="text-[11.5px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Query / Modification Details</label>
                <textarea 
                  rows={4}
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="Specify material grade, quantity adjustment, or delivery timeline change..."
                  className="w-full p-3.5 rounded-2xl border border-slate-300 bg-slate-50 text-slate-900 text-[14px] font-semibold outline-none"
                />
              </div>
            </div>
            <button onClick={() => { if (queryText.trim()) { triggerToast("❓ Procurement query submitted to inventory team!"); setQueryText(''); setShowQueryModal(false); } }} className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-[14px] cursor-pointer transition shadow-md">
              Submit Query to Inventory Lead 📋
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modal 4: Needs Discussion Note */}
      {showDiscussionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 border border-slate-300 rounded-[28px] max-w-lg w-full p-7 shadow-2xl android-modal-enter">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <h3 className="text-[18px] font-extrabold flex items-center gap-2 text-slate-900">
                <span>💬</span> Schedule Discussion: {discussionItem}
              </h3>
              <button onClick={() => setShowDiscussionModal(false)} className="w-9 h-9 rounded-full glass-button flex items-center justify-center font-bold text-slate-900">✕</button>
            </div>
            <div className="my-5 flex flex-col gap-4 text-[13.5px]">
              <div>
                <label className="text-[11.5px] font-bold text-slate-700 uppercase tracking-wider block mb-1.5">Director's Discussion Agenda / Note</label>
                <textarea 
                  rows={4}
                  value={discussionNote}
                  onChange={(e) => setDiscussionNote(e.target.value)}
                  placeholder="Enter specific points to discuss with department head..."
                  className="w-full p-3.5 rounded-2xl border border-slate-300 bg-slate-50 text-slate-900 text-[14px] font-semibold outline-none"
                />
              </div>
            </div>
            <button onClick={() => { triggerToast(`💬 Discussion meeting booked for "${discussionItem}"!`); setShowDiscussionModal(false); }} className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-[14px] cursor-pointer transition shadow-md">
              Schedule Discussion Meeting 📅
            </button>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all">
          <div className="bg-white text-slate-900 border border-slate-300 rounded-[28px] max-w-xl w-full p-7 shadow-2xl android-modal-enter">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <h3 className="text-[18px] font-extrabold flex items-center gap-2.5 text-slate-900">
                <span className="text-[#af2024] p-2 bg-[#fce8e6] rounded-xl">{IconOutlined.calendar}</span> Executive Schedule & Calendar
              </h3>
              <button onClick={() => setShowCalendarModal(false)} className="w-9 h-9 rounded-full glass-button flex items-center justify-center font-bold text-slate-900">✕</button>
            </div>
            <div className="my-5 flex flex-col gap-3">
              <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-slate-900">11:00 AM - Board Meeting</div>
                  <div className="text-[12.5px] text-slate-600 font-medium">Kolhapur HQ Boardroom • Strategy & Cashflow Review</div>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-bold text-[11px] rounded-full">Confirmed</span>
              </div>
            </div>
            <button onClick={() => setShowCalendarModal(false)} className="w-full py-3 glass-button rounded-2xl font-bold text-[14px] cursor-pointer text-slate-900">Close</button>
          </div>
        </div>
      )}

      {/* Profile / Workspace Launcher Menu styled exactly like the attached reference image */}
      {showProfileMenu && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-6 pt-20" onClick={() => setShowProfileMenu(false)}>
          <div className="bg-[#202124] text-white border border-white/15 rounded-[32px] w-[380px] shadow-2xl p-6 flex flex-col gap-5 android-modal-enter backdrop-blur-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div className="font-bold text-[16px] tracking-wide text-gray-100">Your favorites</div>
              <button onClick={() => setShowProfileMenu(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 font-bold">✕</button>
            </div>
            
            {/* Grid Menu styled exactly like the provided reference screenshot with circular gradient icons */}
            <div className="grid grid-cols-3 gap-6 text-center py-2">
              <div onClick={() => { setActiveTab('command'); setShowProfileMenu(false); }} className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white/10 cursor-pointer transition group">
                <span className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">⚡</span>
                <span className="text-[12.5px] font-semibold text-gray-200">Command</span>
              </div>
              <div onClick={() => { setActiveTab('tendering'); setShowProfileMenu(false); }} className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white/10 cursor-pointer transition group">
                <span className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">📋</span>
                <span className="text-[12.5px] font-semibold text-gray-200">Tendering</span>
              </div>
              <div onClick={() => { setActiveTab('engineering'); setShowProfileMenu(false); }} className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white/10 cursor-pointer transition group">
                <span className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">📐</span>
                <span className="text-[12.5px] font-semibold text-gray-200">Engineering</span>
              </div>
              <div onClick={() => { setActiveTab('fleet'); setShowProfileMenu(false); }} className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white/10 cursor-pointer transition group">
                <span className="w-14 h-14 rounded-full bg-gradient-to-tr from-red-500 to-orange-400 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">🚜</span>
                <span className="text-[12.5px] font-semibold text-gray-200">Fleet</span>
              </div>
              <div onClick={() => { setActiveTab('material'); setShowProfileMenu(false); }} className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white/10 cursor-pointer transition group">
                <span className="w-14 h-14 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">📦</span>
                <span className="text-[12.5px] font-semibold text-gray-200">Materials</span>
              </div>
              <div onClick={() => { setActiveTab('vendor'); setShowProfileMenu(false); }} className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white/10 cursor-pointer transition group">
                <span className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">💳</span>
                <span className="text-[12.5px] font-semibold text-gray-200">Finance</span>
              </div>
              <div onClick={() => { setActiveTab('workforce'); setShowProfileMenu(false); }} className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white/10 cursor-pointer transition group">
                <span className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">👷</span>
                <span className="text-[12.5px] font-semibold text-gray-200">Workforce</span>
              </div>
              <div onClick={() => { setActiveTab('safety'); setShowProfileMenu(false); }} className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white/10 cursor-pointer transition group">
                <span className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-400 to-blue-600 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">🛡️</span>
                <span className="text-[12.5px] font-semibold text-gray-200">Safety</span>
              </div>
              <div onClick={() => { setActiveTab('reporting'); setShowProfileMenu(false); }} className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white/10 cursor-pointer transition group">
                <span className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-500 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">📈</span>
                <span className="text-[12.5px] font-semibold text-gray-200">Reporting</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center text-[13px]">
              <div className="text-gray-400 font-medium">Sushant (Director)</div>
              <button onClick={() => { setShowProfileMenu(false); triggerToast("Logged out successfully"); }} className="px-4 py-2 bg-[#af2024] text-white rounded-xl font-bold cursor-pointer hover:bg-[#92191d] transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-xs transition-opacity" />
      )}

      {/* Left Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 bg-white border-slate-300 text-slate-900 border-r flex flex-col justify-between p-4 pl-5 shrink-0 transition-all duration-300 shadow-sm
        ${isSidebarCollapsed ? 'md:w-[90px]' : 'md:w-[280px]'}
        ${isMobileMenuOpen ? 'w-[280px] translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            {(!isSidebarCollapsed || isMobileMenuOpen) && (
              <div className="flex items-center gap-2.5 overflow-hidden android-slide-enter">
                <img src="/logo.png" alt="MD Infra Logo" className="w-52 h-auto object-contain rounded" />
              </div>
            )}
            <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden w-8 h-8 rounded-xl glass-button flex items-center justify-center font-bold">✕</button>
          </div>

          {(!isSidebarCollapsed || isMobileMenuOpen) && (
            <div className="text-[11px] text-slate-600 mt-4 mb-2 font-extrabold uppercase tracking-wider px-2">Workspace Modules</div>
          )}
          
          {/* NEW REQUEST: When sidebar is collapsed, display exact attached reference style grid menu */}
          {isSidebarCollapsed && !isMobileMenuOpen ? (
            <div className="flex flex-col items-center gap-3.5 py-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              {menuItems.map((item) => {
                const isSelected = activeTab === item.id && !selectedSite;
                return (
                  <div 
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setSelectedSite(null); triggerToast(`Navigated to ${item.name} Module`); }}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer transition-all shadow-sm ${
                      isSelected ? 'bg-[#af2024] text-white scale-105 shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title={item.name}
                  >
                    <span className="text-xl">{item.icon}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <ul className="flex flex-col gap-1.5 mt-2 overflow-y-auto max-h-[calc(100vh-230px)] pr-1">
              {menuItems.map((item) => (
                <li 
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSelectedSite(null); setIsMobileMenuOpen(false); triggerToast(`Navigated to ${item.name} Module`); }}
                  className={`flex items-center gap-3.5 p-3 rounded-2xl text-[14px] font-bold cursor-pointer transition-all ${activeTab === item.id && !selectedSite ? 'bg-[#af2024] text-white shadow-lg shadow-[#af2024]/20 scale-[1.02] ml-1' : 'text-slate-900 hover:bg-slate-100 hover:text-[#af2024]'}`}
                >
                  <span className="text-[17px] shrink-0 font-light opacity-90">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-slate-200 pt-3 mt-2 flex flex-col gap-3">
          {(!isSidebarCollapsed || isMobileMenuOpen) && (
            <div className="text-[11.5px] text-slate-700 font-bold px-1">MDI Private Limited • Kolhapur HQ</div>
          )}
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col overflow-y-auto relative w-full">
        {/* Marquee Tenders News */}
        <div className="bg-[#af2024] text-white text-[13px] font-bold py-3 px-6 flex items-center overflow-hidden shrink-0 shadow-md gap-4">
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="hidden md:flex glass-button text-slate-900 font-bold px-3.5 py-1.5 rounded-full text-[11px] shrink-0 border border-white/35 items-center gap-1.5 shadow-sm cursor-pointer">
            <span>{isSidebarCollapsed ? '📂 Open Menu' : '📁 Collapse Menu'}</span>
          </button>
          <span className="bg-white/20 text-white font-bold px-3 py-1 rounded-full text-[11px] shrink-0 border border-white/30 hidden sm:flex items-center gap-1.5 shadow-sm">
            {IconOutlined.clipboard} GOV TENDERS TICKER
          </span>
          <div className="w-full overflow-hidden whitespace-nowrap">
            <div className="animate-marquee inline-flex gap-16 font-semibold cursor-pointer">
              <span onClick={() => window.open('https://etenders.gov.in', '_blank')} className="hover:underline">
                ⚡ NHAI releases <b>₹450 Cr</b> EPC Tender for Pune-Nashik Greenfield Corridor (Deadline: Sept 20) → Click to view eProcure
              </span>
            </div>
          </div>
        </div>

        <header className="bg-white/95 border-slate-300 text-slate-900 backdrop-blur-md px-4 sm:px-8 py-4 border-b flex justify-between items-center sticky top-0 z-20 shadow-xs gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2.5 rounded-2xl glass-button transition text-slate-900">☰</button>
            <div>
              <h2 className="text-[18px] sm:text-[22px] font-extrabold tracking-tight text-slate-900">Sushant's Command Centre</h2>
              <p className="text-[12px] sm:text-[13px] text-slate-600 font-semibold mt-0.5 hidden sm:block">Live Interactive Enterprise ERP Environment</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden lg:flex items-center bg-slate-100 border border-slate-300 text-slate-900 rounded-2xl px-3.5 py-2 w-64 xl:w-72 gap-2.5 transition">
              <input type="text" value={voiceQuery} onChange={(e) => setVoiceQuery(e.target.value)} placeholder="Dispatch command..." className="border-none bg-transparent outline-none text-[13.5px] font-semibold w-full placeholder-slate-500 text-slate-900" />
            </div>
            <div onClick={() => setShowCalendarModal(true)} className="relative glass-button px-3.5 sm:px-4 py-2.5 rounded-2xl cursor-pointer font-bold text-[13px] transition flex items-center gap-2 text-slate-900">
              <span>📅 Schedule</span>
            </div>
            
            {/* Notification Dot with rotating asterisk besides profile picture */}
            <div className="relative flex items-center">
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] shadow-md z-10 font-bold">
                <span className="rotating-asterisk">✱</span>
              </span>
              <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-3 cursor-pointer p-1.5 rounded-2xl transition border border-transparent hover:border-slate-300" title="Open Workspace Launcher">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#af2024] text-white flex items-center justify-center font-bold text-[14px] shadow-md shadow-[#af2024]/20">SU</div>
              </div>
            </div>

          </div>
        </header>

        <div className="p-4 sm:p-8 flex flex-col gap-6 android-slide-enter">
          {selectedSite ? (
            /* =========================================================================
               PROJECT BOARDROOM: SITE DETAILS PAGE (Fully Updated with pristine Light Readability & Android Material Inspiration)
               ========================================================================= */
            <div className="flex flex-col gap-6 android-slide-enter">
              
              {/* 1. Project Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-slate-300 text-slate-900 rounded-[28px] p-6 shadow-sm gap-4 android-card-transition">
                <button onClick={() => setSelectedSite(null)} className="px-4.5 py-2.5 glass-button rounded-2xl font-bold text-[13.5px] cursor-pointer transition text-slate-900">← Back to Command Centre</button>
                <div className="flex-1 md:ml-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-[22px] font-extrabold text-[#af2024]">{selectedSite.name} Project Command View</h2>
                    <span className="px-3.5 py-1 rounded-full text-[12px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">{selectedSite.status}</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-900 font-extrabold text-[12px] rounded-full border border-indigo-300">Health: {selectedSite.health}</span>
                  </div>
                  <p className="text-[13px] text-slate-700 font-bold mt-1">{selectedSite.type} • Location: {selectedSite.location} • PM: {selectedSite.pm} • Entity: {selectedSite.mdiEntity} • Updated: {selectedSite.lastUpdated}</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button onClick={() => handleScheduleMeeting(selectedSite.name)} className="px-4.5 py-2.5 glass-button rounded-2xl text-[13.5px] font-bold cursor-pointer transition text-slate-900">📅 Schedule Meeting</button>
                  <button onClick={() => handleExcelExport(selectedSite.name)} className="px-4.5 py-2.5 bg-[#137333] hover:bg-[#0d5023] text-white rounded-2xl text-[13.5px] font-bold cursor-pointer transition shadow-sm">📊 Export Report</button>
                </div>
              </div>

              {/* 2. Executive Financial Metrics (5 large numbers) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl shadow-xs android-card-transition">
                  <div className="text-[11.5px] text-slate-600 font-extrabold uppercase tracking-wider">Contract Value</div>
                  <div className="text-[22px] font-black text-[#af2024] mt-1">{selectedSite.contractValue}</div>
                </div>
                <div className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl shadow-xs android-card-transition">
                  <div className="text-[11.5px] text-slate-600 font-extrabold uppercase tracking-wider">Billed Amount</div>
                  <div className="text-[22px] font-black text-[#137333] mt-1">{selectedSite.billed}</div>
                </div>
                <div className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl shadow-xs android-card-transition">
                  <div className="text-[11.5px] text-slate-600 font-extrabold uppercase tracking-wider">Received (Collected)</div>
                  <div className="text-[22px] font-black text-sky-700 mt-1">{selectedSite.received}</div>
                </div>
                <div className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl shadow-xs android-card-transition">
                  <div className="text-[11.5px] text-slate-600 font-extrabold uppercase tracking-wider">Project Cost</div>
                  <div className="text-[22px] font-black text-[#b06000] mt-1">{selectedSite.expenditure}</div>
                </div>
                <div className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl shadow-xs android-card-transition">
                  <div className="text-[11.5px] text-slate-600 font-extrabold uppercase tracking-wider">Expected Profit</div>
                  <div className="text-[22px] font-black text-emerald-700 mt-1">{selectedSite.expectedProfit}</div>
                </div>
              </div>

              {/* Requirement 1: Profitability, Statistics & Graphical Stats Bar */}
              <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-6 shadow-sm android-card-transition">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[17px] font-extrabold flex items-center gap-2 text-slate-900"><span>📊</span> Financial Profitability & Margin Analysis</h3>
                  <span className={`px-4 py-1.5 rounded-full text-[13px] font-extrabold border ${selectedSite.profitStatusClass}`}>{selectedSite.financialStatus}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-300 android-card-transition">
                    <div className="text-[12px] text-slate-600 font-extrabold uppercase">Gross Operating Margin</div>
                    <div className="text-[22px] font-black text-slate-900 mt-1">{selectedSite.plData.grossMargin}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-300 android-card-transition">
                    <div className="text-[12px] text-slate-600 font-extrabold uppercase">Billed vs Cost Ratio</div>
                    <div className="text-[22px] font-black text-slate-900 mt-1">{(parseFloat(selectedSite.billed) / parseFloat(selectedSite.expenditure)).toFixed(2)}x Ratio</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-300 android-card-transition">
                    <div className="text-[12px] text-slate-600 font-extrabold uppercase">Expected Profitability</div>
                    <div className="text-[22px] font-black text-emerald-700 mt-1">{selectedSite.expectedProfit}</div>
                  </div>
                </div>
                {/* Graphical stats bar */}
                <div className="w-full bg-slate-200 h-4 rounded-full overflow-hidden flex shadow-inner">
                  <div className="bg-[#137333] h-full transition-all duration-500" style={{ width: '60%' }} title="Billed & Realized Revenue"></div>
                  <div className="bg-amber-500 h-full transition-all duration-500" style={{ width: '25%' }} title="Work In Progress / Unbilled"></div>
                  <div className="bg-red-500 h-full transition-all duration-500" style={{ width: '15%' }} title="Cost Overrun / Variance"></div>
                </div>
                <div className="flex justify-between text-[11.5px] font-extrabold text-slate-700 mt-2">
                  <span className="text-[#137333]">■ Realized Revenue (60%)</span>
                  <span className="text-amber-600">■ WIP / Unbilled JMR (25%)</span>
                  <span className="text-red-600">■ Cost Variance (15%)</span>
                </div>
              </div>

              {/* Requirement 2: Project Timeline & Progress Highlight */}
              <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-6 shadow-sm android-card-transition">
                <h3 className="text-[17px] font-extrabold mb-4 flex items-center gap-2 text-slate-900"><span>⏳</span> Project Timeline & Physical Progress Highlights</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center text-[13.5px] font-extrabold text-slate-900">
                    <span>Start Date: {selectedSite.startDate}</span>
                    <span className="text-[#af2024]">Current Progress: {selectedSite.progress}% Complete</span>
                    <span>Target Completion: {selectedSite.endDate}</span>
                  </div>
                  <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden p-0.5">
                    <div className={`h-full ${selectedSite.progressColor} rounded-full transition-all duration-700`} style={{ width: `${selectedSite.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[12px] text-slate-700 font-bold">
                    <span>Milestone 1: Sub-base (Passed)</span>
                    <span>Milestone 2: Structuring (Active)</span>
                    <span>Milestone 3: Final Paving (Upcoming)</span>
                  </div>
                </div>
              </div>

              {/* NEW REQUEST: Beautiful Minimal Courier-Style Government BOQ Timeline with properly positioned tooltip */}
              <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-8 shadow-sm android-card-transition relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[17px] font-extrabold flex items-center gap-2 text-slate-900">
                    <span>📦</span> Government BOQ Stage Tracking Timeline
                  </h3>
                  <span className="px-3.5 py-1 bg-blue-50 text-blue-700 font-extrabold text-[12px] rounded-full border border-blue-200">
                    💡 Hover milestone number for deadline
                  </span>
                </div>

                <div className="relative flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 pt-14 pb-2 px-2">
                  {/* Horizontal Bar for Desktop */}
                  <div className="absolute hidden md:block top-20 left-12 right-12 h-1.5 bg-slate-200 z-0 rounded-full"></div>

                  {selectedSite.courierStages.map((st: any, idx: number) => {
                    const isDone = st.status === 'Completed';
                    const isActive = st.status === 'In Progress';
                    const isDelayed = st.status === 'Delayed';
                    const isHovered = hoveredMilestone === `${selectedSite.id}-${idx}`;

                    return (
                      <div 
                        key={idx} 
                        className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 flex-1 text-left md:text-center group cursor-pointer"
                        onMouseEnter={() => setHoveredMilestone(`${selectedSite.id}-${idx}`)}
                        onMouseLeave={() => setHoveredMilestone(null)}
                      >
                        {/* Rollover Deadline Tooltip popup positioned high above */}
                        {isHovered && (
                          <div className="absolute -top-10 md:-top-14 z-50 bg-slate-900 text-white px-3.5 py-2 rounded-xl text-[12px] font-extrabold shadow-2xl border border-white/25 whitespace-nowrap android-modal-enter pointer-events-none">
                            ⏰ Target Deadline: {st.deadline}
                          </div>
                        )}

                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-[16px] shadow-md shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${
                          isDone ? 'bg-[#137333] text-white shadow-emerald-500/20' : 
                          isActive ? 'bg-amber-500 text-white animate-pulse shadow-amber-500/30' : 
                          isDelayed ? 'bg-red-600 text-white shadow-red-500/30' : 
                          'bg-slate-200 text-slate-700'
                        }`}>
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <div className="flex flex-col md:items-center">
                          <div className="font-extrabold text-[14px] text-slate-900 group-hover:text-[#af2024] transition-colors">{st.stage}</div>
                          <div className={`text-[12px] font-bold mt-1 px-2.5 py-0.5 rounded-md inline-block ${
                            isDone ? 'bg-emerald-50 text-emerald-800' : 
                            isActive ? 'bg-amber-50 text-amber-800' : 
                            isDelayed ? 'bg-red-50 text-red-800' : 
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {st.status} • {st.date}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Requirement 3: Work Status based on Financial Status and BOQ Status (Including Pie Chart Format & Two Tabs Side by Side) */}
              <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-6 shadow-sm android-card-transition">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <h3 className="text-[17px] font-extrabold flex items-center gap-2 text-slate-900"><span>📋</span> Work Status (Financial & BOQ Subtask Breakdown)</h3>
                  {/* Two tabs side by side */}
                  <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-300">
                    <button 
                      onClick={() => setWorkStatusSubTab('financial')}
                      className={`px-4 py-2 rounded-xl text-[13px] font-bold transition cursor-pointer ${workStatusSubTab === 'financial' ? 'bg-[#af2024] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      Tab 1: BOQ Financial Costing
                    </button>
                    <button 
                      onClick={() => setWorkStatusSubTab('completion')}
                      className={`px-4 py-2 rounded-xl text-[13px] font-bold transition cursor-pointer ${workStatusSubTab === 'completion' ? 'bg-[#af2024] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                    >
                      Tab 2: BOQ Completion Details
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-6">
                  <div className="p-5 bg-slate-50 border border-slate-300 rounded-2xl flex flex-col gap-2 android-card-transition">
                    <div className="text-[12px] font-extrabold text-slate-600 uppercase">Financial Execution Status</div>
                    <div className="text-[16px] font-bold text-slate-900">Status: <span className="text-emerald-700 font-black">{selectedSite.financialStatus}</span></div>
                    <p className="text-[13px] text-slate-700 font-semibold">Billed: <b>{selectedSite.billed}</b> vs Expenditure: <b>{selectedSite.expenditure}</b></p>
                  </div>
                  <div className="p-5 bg-slate-50 border border-slate-300 rounded-2xl flex flex-col gap-2 android-card-transition">
                    <div className="text-[12px] font-extrabold text-slate-600 uppercase">BOQ Work-Package Status</div>
                    <div className="text-[15px] font-bold text-slate-900">{selectedSite.boqStatus}</div>
                    <p className="text-[13px] text-slate-700 font-semibold">Verified against Bill of Quantities master ledger.</p>
                  </div>
                  {/* Pie Chart Representation */}
                  <div className="p-5 bg-slate-50 border border-slate-300 rounded-2xl flex flex-col items-center justify-center gap-3 android-card-transition">
                    <div className="text-[12px] font-extrabold text-slate-600 uppercase">Work Completion Pie Distribution</div>
                    <div className="relative w-24 h-24 rounded-full flex items-center justify-center text-slate-900 font-black text-[13px]" style={{ background: `conic-gradient(#137333 0% ${selectedSite.progress}%, #f59e0b ${selectedSite.progress}% 90%, #ef4444 90% 100%)` }}>
                      <div className="absolute w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-900 text-xs shadow-inner font-black">
                        {selectedSite.progress}%
                      </div>
                    </div>
                    <div className="flex gap-3 text-[10.5px] font-bold text-slate-700">
                      <span className="text-[#137333]">■ Done</span>
                      <span className="text-amber-600">■ WIP</span>
                      <span className="text-red-600">■ Pending</span>
                    </div>
                  </div>
                </div>

                {/* Subtask Tab Content */}
                <div className="pt-4 border-t border-slate-200">
                  {workStatusSubTab === 'financial' ? (
                    <div className="overflow-x-auto">
                      <div className="text-[14px] font-bold text-slate-800 mb-3">Tab 1: Financial Details in Tabular Format Basis Sub-Tasks (BOQ Costing)</div>
                      <table className="w-full text-left border-collapse text-[13.5px]">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 uppercase text-[11.5px] font-extrabold border-b border-slate-300">
                            <th className="p-3">BOQ Sub-Task</th>
                            <th className="p-3">Allocated Budget</th>
                            <th className="p-3">Actual Spent</th>
                            <th className="p-3">Cost Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedSite.boqSubtasksFinancial.map((st: any, idx: number) => (
                            <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 font-medium">
                              <td className="p-3 font-bold text-slate-900">{st.task}</td>
                              <td className="p-3">{st.budget}</td>
                              <td className="p-3">{st.spent}</td>
                              <td className="p-3"><span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-200 text-slate-800">{st.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <div className="text-[14px] font-bold text-slate-800 mb-3">Tab 2: Completion Details Basis Sub-Tasks in BOQ</div>
                      <table className="w-full text-left border-collapse text-[13.5px]">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 uppercase text-[11.5px] font-extrabold border-b border-slate-300">
                            <th className="p-3">BOQ Sub-Task</th>
                            <th className="p-3">Planned Completion</th>
                            <th className="p-3">Actual Completion</th>
                            <th className="p-3">Schedule Variance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedSite.boqSubtasksCompletion.map((st: any, idx: number) => (
                            <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 font-medium">
                              <td className="p-3 font-bold text-slate-900">{st.task}</td>
                              <td className="p-3">{st.planned}</td>
                              <td className="p-3 font-bold text-[#137333]">{st.actual}</td>
                              <td className="p-3 font-bold text-slate-800">{st.variance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Requirement 4: CCTV Live Footage Viewer with Small Popup Play Video CTA Links */}
              <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-6 shadow-sm android-card-transition">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[17px] font-extrabold flex items-center gap-2 text-slate-900"><span>📹</span> Live CCTV Footage & IoT Surveillance</h3>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-extrabold text-[11.5px] rounded-full">🟢 Camera Feeds Active</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col justify-between h-56 relative overflow-hidden shadow-inner border border-slate-800 android-card-transition">
                    <div className="absolute top-3 left-3 bg-black/70 px-3 py-1 rounded-lg text-[11px] font-mono text-white font-bold">CAM-01: Main Gate & Paving Entry</div>
                    <div className="text-center font-bold tracking-widest opacity-90 my-auto text-sm text-white">LIVE FEED [4K 60FPS]</div>
                    <div className="flex justify-between items-center text-[11px] opacity-95 text-white font-bold">
                      <span>Status: Normal</span>
                      <button onClick={() => { setActiveVideoUrl("https://www.youtube.com/watch?v=B1zCgR1AdCs"); setActiveVideoTitle("Camera 01 - Main Gate & Paving Entry"); }} className="px-3.5 py-2 bg-[#af2024] hover:bg-[#92191d] text-white rounded-xl text-[12.5px] font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer">
                        ▶ Play from Camera01
                      </button>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col justify-between h-56 relative overflow-hidden shadow-inner border border-slate-800 android-card-transition">
                    <div className="absolute top-3 left-3 bg-black/70 px-3 py-1 rounded-lg text-[11px] font-mono text-white font-bold">CAM-02: Structural Yard & Heavy Machinery</div>
                    <div className="text-center font-bold tracking-widest opacity-90 my-auto text-sm text-white">LIVE FEED [4K 60FPS]</div>
                    <div className="flex justify-between items-center text-[11px] opacity-95 text-white font-bold">
                      <span>Status: Active Operations</span>
                      <button onClick={() => { setActiveVideoUrl("https://www.youtube.com/watch?v=B1zCgR1AdCs"); setActiveVideoTitle("Camera 02 - Structural Yard & Heavy Machinery"); }} className="px-3.5 py-2 bg-[#af2024] hover:bg-[#92191d] text-white rounded-xl text-[12.5px] font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer">
                        ▶ Play from Camera02
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirement 5: Concerned People with Schedule Meeting & Call Now CTAs (Expanded Profiles) */}
              <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-6 shadow-sm android-card-transition">
                <h3 className="text-[17px] font-extrabold mb-4 flex items-center gap-2 text-slate-900"><span>👥</span> Concerned Site Personnel & Leadership Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {selectedSite.concernedTeam.map((person: any, idx: number) => (
                    <div key={idx} className="p-5 bg-slate-50 border border-slate-300 rounded-2xl flex flex-col justify-between gap-4 android-card-transition">
                      <div>
                        <div className="text-[11.5px] font-extrabold text-[#af2024] uppercase">{person.role}</div>
                        <div className="text-[17px] font-bold text-slate-900 mt-1">{person.name}</div>
                        <div className="text-[13px] text-slate-800 font-bold">{person.phone}</div>
                        <div className="text-[12px] text-slate-600 truncate font-semibold">{person.email}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => triggerToast(`📞 Dialing ${person.name} at ${person.phone}...`)} className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[12.5px] font-bold cursor-pointer transition shadow-xs">
                          Call now 📞
                        </button>
                        <button onClick={() => handleScheduleMeeting(`${selectedSite.name} - ${person.name}`)} className="flex-1 py-2.5 glass-button rounded-xl text-[12.5px] font-bold cursor-pointer transition text-slate-900 border border-slate-300">
                          Schedule 📅
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirement 6: Pendancies and Actions to Take */}
              <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-6 shadow-sm android-card-transition">
                <h3 className="text-[17px] font-extrabold mb-4 flex items-center gap-2 text-slate-900"><span>⚠️</span> Pendancies & Actions Required</h3>
                <div className="flex flex-col gap-4">
                  {selectedSite.pendencies.map((pend: any, idx: number) => (
                    <div key={idx} className="p-4 bg-amber-50 border border-amber-300 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 android-card-transition">
                      <div>
                        <div className="font-extrabold text-[15px] text-amber-900">{pend.item}</div>
                        <div className="text-[13px] text-amber-900/90 font-bold mt-0.5">Impact: <b>{pend.impact}</b> • Deadline: {pend.deadline}</div>
                      </div>
                      <button onClick={() => triggerToast(`⚡ Executed action: ${pend.action} for ${selectedSite.name}`)} className="px-4 py-2.5 bg-[#af2024] hover:bg-[#92191d] text-white rounded-xl text-[13px] font-bold cursor-pointer transition shadow-sm">
                        {pend.action} ⚡
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirement 7: AI Suggested "Next Best Action for this site" */}
              <div className="p-6 bg-gradient-to-br from-indigo-500/15 via-indigo-500/5 to-transparent border border-indigo-500/40 rounded-[28px] shadow-sm android-card-transition">
                <h3 className="text-[17px] font-extrabold mb-2 flex items-center gap-2 text-indigo-900">
                  <span>✨</span> AI-Powered Next Best Action
                </h3>
                <p className="text-[14.5px] font-extrabold text-slate-900 leading-relaxed mb-3">
                  "{selectedSite.aiRecommendation}"
                </p>
                <div className="flex justify-between items-center text-[12px] font-bold text-slate-700">
                  <span>Confidence Score: 98.4% (Based on multi-site ERP telemetry)</span>
                  <button onClick={() => triggerToast(`🚀 AI Action successfully automated for ${selectedSite.name}!`)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[12.5px] font-bold cursor-pointer transition shadow-sm">
                    Execute AI Recommendation 🚀
                  </button>
                </div>
              </div>

              {/* Requirement 8: Google Map with Site Location & Schedule Trip Button */}
              <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-6 shadow-sm android-card-transition">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[17px] font-extrabold flex items-center gap-2 text-slate-900"><span>🗺️</span> Site Geographical Location & Route Planner</h3>
                  <button onClick={() => { triggerToast(`🚗 Trip scheduled to ${selectedSite.name} site! Driver notified.`); }} className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-[13px] font-bold cursor-pointer transition shadow-sm flex items-center gap-1.5">
                    <span>🚗</span> Schedule a Trip to Site
                  </button>
                </div>
                <div className="w-full h-64 bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-white shadow-inner border border-slate-700">
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <span className="text-4xl mb-2">📍</span>
                  <div className="font-bold text-[16px] z-10 text-white">{selectedSite.name} Highway Corridor</div>
                  <div className="text-[13px] text-sky-400 font-mono mt-1 z-10 font-bold">{selectedSite.coordinates} • {selectedSite.location}</div>
                  <div className="mt-4 px-4 py-1.5 bg-black/80 backdrop-blur-md rounded-full text-[12px] text-white border border-white/25 z-10 font-semibold">
                    Live GPS Telemetry Connected • Route Clear
                  </div>
                </div>
              </div>

            </div>
          ) : (
            activeTab === 'command' ? (
              <div className="flex flex-col gap-6 android-slide-enter">
                
                {/* When menu is collapsed, display 12 menu items arranged beautifully in one line in card format above consolidated financial dashboard */}
                {isSidebarCollapsed && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-3 android-slide-enter">
                    {menuItems.map((item) => (
                      <div 
                        key={item.id}
                        onClick={() => { setActiveTab(item.id); setSelectedSite(null); triggerToast(`Navigated to ${item.name} Module`); }}
                        className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition apple-card-transition ${activeTab === item.id ? 'bg-[#af2024] text-white border-transparent shadow-md' : 'bg-white border-slate-300 text-slate-800 hover:border-[#af2024]'}`}
                      >
                        <span className="text-[20px]">{item.icon}</span>
                        <span className="text-[11px] font-semibold text-center truncate w-full">{item.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Executive Morning Briefing & Weather Widget */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left dark card with watch-style larger clock and tooltip on rollover */}
                  <div className="bg-gradient-to-br from-[#1e1e1e] to-gray-900 text-white rounded-[28px] p-7 flex flex-col sm:flex-row justify-between items-center shadow-xl android-card-transition relative overflow-hidden gap-5">
                    <div className="flex-1">
                      <div className="text-[12px] font-bold opacity-60 uppercase tracking-widest">Executive Morning Briefing</div>
                      <h1 className="text-[22px] sm:text-[26px] font-bold mt-1.5 tracking-tight">Hello, good morning, Sushant.</h1>
                      <p className="text-[13.5px] opacity-85 font-normal mt-2 leading-relaxed">All strategic sites mobilized. Operations running at <b>94.6%</b> efficiency.</p>
                      <div className="mt-4 pt-3 border-t border-white/15 flex justify-between text-[12px] font-medium opacity-90">
                        <span>📍 Kolhapur HQ</span>
                        <span>Active Telemetry</span>
                      </div>
                    </div>

                    {/* Larger Analogue Clock with Rollover Tooltip */}
                    <div 
                      className="relative w-40 h-40 rounded-full bg-[#1c1c1e] border-2 border-gray-800 flex items-center justify-center shadow-2xl shrink-0 cursor-pointer"
                      onMouseEnter={() => setShowClockTooltip(true)}
                      onMouseLeave={() => setShowClockTooltip(false)}
                    >
                      {showClockTooltip && (
                        <div className="absolute -top-12 z-30 bg-[#252525] text-white px-3 py-1.5 rounded-xl text-[11.5px] font-bold shadow-xl border border-white/20 whitespace-nowrap android-modal-enter">
                          📌 Today: 03:30 PM - Tumkuru Inspection
                        </div>
                      )}

                      {/* Second hand */}
                      <div 
                        className="absolute w-[1.5px] h-12 bg-[#ff453a] origin-bottom bottom-1/2 transition-transform duration-100 z-20"
                        style={{ transform: `rotate(${clockAngles.sec}deg)` }}
                      ></div>

                      {/* White minute hand */}
                      <div 
                        className="absolute w-[3px] h-14 bg-white origin-bottom bottom-1/2 transition-transform duration-300 z-10 rounded-full"
                        style={{ transform: `rotate(${clockAngles.min}deg)` }}
                      ></div>
                      
                      {/* White hour hand */}
                      <div 
                        className="absolute w-[3.5px] h-9 bg-white origin-bottom bottom-1/2 transition-transform duration-500 z-10 rounded-full"
                        style={{ transform: `rotate(${clockAngles.hour}deg)` }}
                      ></div>

                      {/* Center pin */}
                      <div className="w-3.5 h-3.5 bg-gray-400 rounded-full z-40 border-2 border-[#1c1c1e]"></div>
                    </div>
                  </div>

                  {/* Weather Intelligence with dynamic animated weather graphics */}
                  <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-7 flex flex-col justify-between shadow-sm android-card-transition relative overflow-hidden">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-[11.5px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                        <span>🌤️ weather.com Site Intelligence</span>
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-[10px] font-extrabold">({currentWeatherIndex + 1}/{siteWeatherReports.length})</span>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setCurrentWeatherIndex((prev) => (prev === 0 ? siteWeatherReports.length - 1 : prev - 1))}
                          className="w-8 h-8 rounded-full glass-button flex items-center justify-center font-bold cursor-pointer text-slate-900"
                        >
                          ‹
                        </button>
                        <button 
                          onClick={() => setCurrentWeatherIndex((prev) => (prev === siteWeatherReports.length - 1 ? 0 : prev + 1))}
                          className="w-8 h-8 rounded-full glass-button flex items-center justify-center font-bold cursor-pointer text-slate-900"
                        >
                          ›
                        </button>
                      </div>
                    </div>

                    {/* Current Swiped Weather Card */}
                    {(() => {
                      const rep = siteWeatherReports[currentWeatherIndex];
                      return (
                        <div className="flex flex-col justify-between flex-1 my-2 relative">
                          {/* Animated Weather Elements Overlay */}
                          <div className="absolute top-0 right-4 pointer-events-none flex items-center justify-center w-20 h-16 overflow-hidden">
                            {rep.type === 'rainy' && (
                              <div className="relative w-full h-full flex flex-col items-center">
                                <span className="text-2xl cloud-animation">☁️</span>
                                <div className="absolute inset-x-0 bottom-0 h-8">
                                  <span className="rain-drop" style={{ left: '30%', animationDuration: '0.6s' }}></span>
                                  <span className="rain-drop" style={{ left: '60%', animationDuration: '0.4s' }}></span>
                                </div>
                              </div>
                            )}
                            {rep.type === 'sunny' && (
                              <div className="text-3xl sun-animation">
                                ☀️
                              </div>
                            )}
                            {rep.type === 'thunderstorm' && (
                              <div className="text-3xl cloud-animation">
                                🌩️
                              </div>
                            )}
                            {rep.type === 'cloudy' && (
                              <div className="text-3xl cloud-animation">
                                ⛅
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between items-start pr-20">
                            <div>
                              <div className="text-[20px] font-extrabold" style={{ color: '#222630' }}>{rep.site} Site</div>
                              <div className="text-[16px] font-bold mt-0.5" style={{ color: '#222630' }}>{rep.temp} · {rep.condition}</div>
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-2xl border mt-3 flex items-center justify-between gap-3 text-[13px] font-bold bg-slate-50 text-slate-800 border-slate-300 shadow-xs">
                            <span>{rep.alert}</span>
                            <button onClick={() => { setArrangementSite(rep.site); setShowArrangementModal(true); }} className="px-3.5 py-2 bg-[#af2024] hover:bg-[#92191d] text-white rounded-xl text-[12px] font-bold shrink-0 shadow-sm cursor-pointer transition">
                              Check arrangements
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* ==========================================
                    1. CONSOLIDATED FINANCIAL & EXPENSE DASHBOARD
                   ========================================== */}
                <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-7 shadow-sm android-card-transition">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h3 className="text-[18px] font-bold flex items-center gap-2">
                      <span>📈</span> Consolidated Enterprise Financial & Expense Dashboard
                    </h3>
                    <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-300">
                      <button 
                        onClick={() => setConsolidatedTab('financial')}
                        className={`px-4 py-2 rounded-xl text-[13px] font-bold transition cursor-pointer ${consolidatedTab === 'financial' ? 'bg-[#af2024] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        Financial Report
                      </button>
                      <button 
                        onClick={() => setConsolidatedTab('boq')}
                        className={`px-4 py-2 rounded-xl text-[13px] font-bold transition cursor-pointer ${consolidatedTab === 'boq' ? 'bg-[#af2024] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                      >
                        BOQ Report
                      </button>
                    </div>
                  </div>

                  {consolidatedTab === 'financial' ? (
                    <div>
                      <div className="mb-5 p-5 bg-gradient-to-br from-[#af2024]/10 via-[#af2024]/5 to-transparent border border-[#af2024]/30 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
                        <div>
                          <span className="text-[11.5px] text-slate-600 font-bold uppercase tracking-wider">Total Enterprise Turnover / Project Cost</span>
                          <div className="text-[30px] sm:text-[34px] font-black text-[#af2024] mt-1">₹510.0 Cr</div>
                        </div>
                        <div className="px-3.5 py-1.5 bg-[#af2024]/15 text-[#af2024] font-bold text-[12px] rounded-xl border border-[#af2024]/30">
                          ↗ Fully Mobilized & Funded
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl flex flex-col justify-between shadow-xs android-card-transition">
                          <div>
                            <span className="text-[12px] text-slate-600 font-bold uppercase tracking-wider">Expenditure Until Date</span>
                            <div className="text-[26px] font-black text-[#b06000] mt-2">₹415.0 Cr</div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-[12px] font-semibold text-slate-600">
                            <span>81.3% Utilized</span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#b06000]"></span>
                          </div>
                        </div>

                        <div className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl flex flex-col justify-between shadow-xs android-card-transition">
                          <div>
                            <span className="text-[12px] text-slate-600 font-bold uppercase tracking-wider">Total Billed Amount</span>
                            <div className="text-[26px] font-black text-[#137333] mt-2">₹363.2 Cr</div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-[12px] font-semibold text-slate-600">
                            <span>71.2% Realized</span>
                            <span className="w-2.5 h-2.5 rounded-full bg-[#137333]"></span>
                          </div>
                        </div>

                        <div className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl flex flex-col justify-between shadow-xs android-card-transition">
                          <div>
                            <span className="text-[12px] text-slate-600 font-bold uppercase tracking-wider">Total Unbilled Amount</span>
                            <div className="text-[26px] font-black text-amber-600 mt-2">₹42.8 Cr</div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between items-center text-[12px] font-semibold text-slate-600">
                            <span>Pending JMR</span>
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4">
                        <button onClick={() => handleExcelExport("Financial_Report")} className="px-4 py-2 glass-button rounded-full text-[12.5px] font-bold text-slate-900 cursor-pointer transition flex items-center gap-1.5 shadow-2xs">
                          📊 Export XLS
                        </button>
                        <button onClick={() => handlePdfExport("Financial_Report")} className="px-4 py-2 bg-[#af2024] hover:bg-[#92191d] text-white rounded-full text-[12.5px] font-bold cursor-pointer transition shadow-2xs flex items-center gap-1.5">
                          📄 Export PDF
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl flex flex-col justify-between shadow-xs">
                          <div>
                            <span className="text-[12px] text-slate-600 font-bold uppercase tracking-wider">Earthwork & Embankment</span>
                            <div className="text-[26px] font-black text-[#137333] mt-2">88% Done</div>
                          </div>
                          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mt-4">
                            <div className="h-full bg-[#137333] rounded-full transition-all duration-500" style={{ width: '88%' }}></div>
                          </div>
                        </div>

                        <div className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl flex flex-col justify-between shadow-xs">
                          <div>
                            <span className="text-[12px] text-slate-600 font-bold uppercase tracking-wider">Structures & Piling</span>
                            <div className="text-[26px] font-black text-sky-600 mt-2">74% Done</div>
                          </div>
                          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mt-4">
                            <div className="h-full bg-sky-600 rounded-full transition-all duration-500" style={{ width: '74%' }}></div>
                          </div>
                        </div>

                        <div className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl flex flex-col justify-between shadow-xs">
                          <div>
                            <span className="text-[12px] text-slate-600 font-bold uppercase tracking-wider">Bituminous Paving DBM/BC</span>
                            <div className="text-[26px] font-black text-[#b06000] mt-2">62% Done</div>
                          </div>
                          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mt-4">
                            <div className="h-full bg-[#b06000] rounded-full transition-all duration-500" style={{ width: '62%' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4">
                        <button onClick={() => handleExcelExport("BOQ_Report")} className="px-4 py-2 glass-button rounded-full text-[12.5px] font-bold text-slate-900 cursor-pointer transition flex items-center gap-1.5 shadow-2xs">
                          📊 Export XLS
                        </button>
                        <button onClick={() => handlePdfExport("BOQ_Report")} className="px-4 py-2 bg-[#af2024] hover:bg-[#92191d] text-white rounded-full text-[12.5px] font-bold cursor-pointer transition shadow-2xs flex items-center gap-1.5">
                          📄 Export PDF
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* ==========================================
                    2. ZONE-WISE STRATEGIC HUB (Collapsed by default)
                   ========================================== */}
                <div className="flex flex-col gap-6">
                  <h3 className="text-[18px] font-bold flex items-center gap-2">
                    <span>📍</span> Zone-wise Strategic Hubs (South Zone: Hubali, Tumkuru, Goa | North Zone: Satara, Vele, Pune)
                  </h3>

                  {['North Zone', 'South Zone'].map((zoneName) => {
                    const isZoneOpen = openZone === zoneName;
                    const zoneSites = allSites.filter(s => s.zone === zoneName);

                    return (
                      <div key={zoneName} className={`animated-gradient-border-${zoneName === 'South Zone' ? 'profitable' : 'moderate'} rounded-[28px] shadow-sm`}>
                        <div className="bg-white rounded-[27px] p-6 border border-slate-300">
                          
                          <div 
                            onClick={() => setOpenZone(isZoneOpen ? null : zoneName)}
                            className="flex justify-between items-center cursor-pointer pb-2"
                          >
                            <h4 className="text-[18px] font-bold flex items-center gap-2.5 text-slate-900">
                              <span>🌐</span> {zoneName} Hub ({zoneSites.length} Sites Active)
                            </h4>
                            <span className="text-xl font-bold text-slate-500">{isZoneOpen ? '▲' : '▼'}</span>
                          </div>

                          {isZoneOpen && (
                            <div className="mt-5 flex flex-col gap-4 animate-fadeIn">
                              {zoneSites.map((site) => {
                                const isSiteOpen = openSiteId === site.id;

                                return (
                                  <div key={site.id} className="p-5 bg-white border border-slate-300 text-slate-900 rounded-2xl flex flex-col gap-4 shadow-xs">
                                    
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                      <div className="cursor-pointer flex-1" onClick={() => setOpenSiteId(isSiteOpen ? null : site.id)}>
                                        <div className="flex items-center gap-3 flex-wrap">
                                          <span className="font-black text-[17px] text-slate-900">{site.name}</span>
                                          <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${site.statusClass}`}>{site.status}</span>
                                        </div>
                                        <div className="text-[13.5px] font-bold mt-1 text-slate-700">
                                          Cost: <b className="text-slate-900">{site.budget}</b> • Timeline: {site.startDate} to {site.endDate}
                                        </div>
                                        <div className="w-full sm:w-72 h-3 bg-slate-200 rounded-full overflow-hidden mt-3">
                                          <div className={`h-full ${site.progressColor} rounded-full`} style={{ width: `${site.progress}%` }}></div>
                                        </div>
                                      </div>

                                      <div className="flex items-center gap-2.5 flex-wrap">
                                        <button 
                                          onClick={() => setAiPopupSite(site)}
                                          className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-[12.5px] font-extrabold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                                        >
                                          <span>✨</span> AI Action
                                        </button>
                                        <button 
                                          onClick={() => triggerToast(`🚨 SOS Initiated! Connecting with Project Manager ${site.pm}...`)}
                                          className="px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-[12.5px] font-extrabold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                                        >
                                          <span>{IconOutlined.sos}</span> SOS
                                        </button>
                                        <button 
                                          onClick={() => setSelectedSite(site)}
                                          className="px-4 py-2 rounded-xl text-[12.5px] font-extrabold transition cursor-pointer shadow-xs bg-slate-900 text-white hover:bg-black"
                                        >
                                          Check Details →
                                        </button>
                                      </div>
                                    </div>

                                    {isSiteOpen && (
                                      <div className="pt-4 mt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center android-slide-enter">
                                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 shadow-xs">
                                          <div className="text-[11.5px] text-slate-600 uppercase font-bold">Project Cost</div>
                                          <div className="text-[16px] font-black text-[#af2024] mt-1">{site.budget}</div>
                                        </div>
                                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 shadow-xs">
                                          <div className="text-[11.5px] text-slate-600 uppercase font-bold">Unbilled Amount</div>
                                          <div className="text-[16px] font-black text-[#b06000] mt-1">{site.unbilled}</div>
                                        </div>
                                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 shadow-xs">
                                          <div className="text-[11.5px] text-slate-600 uppercase font-bold">Total Billed</div>
                                          <div className="text-[16px] font-black text-slate-900 mt-1">{site.billed}</div>
                                        </div>
                                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-300 shadow-xs">
                                          <div className="text-[11.5px] text-slate-600 uppercase font-bold">Expenditure To Date</div>
                                          <div className="text-[16px] font-black text-[#137333] mt-1">{site.expenditure}</div>
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
                <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-7 shadow-sm android-card-transition">
                  <h3 className="text-[17px] font-bold mb-4 flex items-center gap-2.5">
                    <span className="text-[#af2024]">{IconOutlined.bell}</span> Critical Notification Centre
                  </h3>
                  <div className="p-4 bg-[#fef7e0] text-amber-900 border border-[#f59e0b]/30 rounded-2xl text-[14px] font-semibold">
                    ⚠️ Hubali JMR Sign-off pending from NHAI Project Director (₹22 Cr value)
                  </div>
                </div>

                {/* ==========================================
                    3. DEPARTMENTAL PENDING APPROVALS QUEUE (Accordion Style - Collapsed by default)
                   ========================================== */}
                <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-7 shadow-sm android-card-transition">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[18px] font-bold flex items-center gap-2.5">
                      <span className="text-[#af2024]">{IconOutlined.clipboard}</span> Departmental Pending Approvals Queue (Accordion View)
                    </h3>
                    <span className="text-[12.5px] text-slate-500 font-bold">Click department header to expand</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    {departmentApprovals.filter(app => app.count > 0).map(app => {
                      const isDeptOpen = openApprovalDept === app.id;

                      return (
                        <div key={app.id} className="group bg-gradient-to-br from-white to-slate-100 border border-slate-300 rounded-[24px] shadow-xs relative android-card-transition overflow-hidden">
                          
                          {/* Accordion Header */}
                          <div 
                            onClick={() => setOpenApprovalDept(isDeptOpen ? null : app.id)}
                            className="p-5 flex justify-between items-center cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-3">
                              {app.isCritical ? (
                                <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-black text-[14px] shadow-md shrink-0">
                                  <span className="rotating-asterisk">✱</span>
                                </div>
                              ) : (
                                <div className="w-7 h-7 bg-[#af2024] text-white rounded-full flex items-center justify-center font-bold text-[12px] shadow-md shrink-0">
                                  {app.count}
                                </div>
                              )}
                              <div>
                                <div className="text-[11.5px] font-bold uppercase tracking-wider text-slate-600">{app.dept}</div>
                                <div className="font-bold text-[15px] text-slate-900">{app.count} Pending Item{app.count > 1 ? 's' : ''} Requiring Review</div>
                              </div>
                            </div>
                            <span className="text-lg font-bold text-slate-500">{isDeptOpen ? '▲' : '▼'}</span>
                          </div>

                          {/* Accordion Content */}
                          {isDeptOpen && (
                            <div className="px-5 pb-5 pt-2 border-t border-slate-200 android-slide-enter flex flex-col gap-4">
                              {app.items.map((item, idx) => (
                                <div key={idx} className={`pb-3.5 ${idx < app.items.length - 1 ? 'border-b border-slate-200' : ''}`}>
                                  <div className="font-bold text-[14.5px] leading-snug text-slate-900">{item.title}</div>
                                  <div className="text-[12.5px] text-slate-600 font-medium mt-0.5">{item.sub}</div>
                                  <div className="hover-actions flex items-center gap-2.5 mt-3 pt-2">
                                    <button onClick={() => triggerToast(`Approved: ${item.title}`)} className="px-3 py-1.5 bg-[#137333] hover:bg-[#0d5023] text-white rounded-lg text-[12px] font-bold transition flex items-center gap-1 shadow-xs cursor-pointer">
                                      <span>{IconOutlined.thumbUp}</span> Approve
                                    </button>
                                    <button onClick={() => { setDiscussionItem(item.title); setShowDiscussionModal(true); }} className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-[12px] font-bold transition shadow-xs cursor-pointer">
                                      Needs discussion
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ==========================================
                    4. REAL MONTHLY CALENDAR & TRIP PLANNER & MATERIAL SCHEDULE
                   ========================================== */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Real Monthly Calendar Widget with Tooltips on Rollover */}
                  <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-6 shadow-sm android-card-transition relative">
                    <h3 className="text-[16px] font-bold mb-4 flex items-center gap-2">
                      <span className="text-[#af2024]">{IconOutlined.calendar}</span> September 2026 Calendar
                    </h3>
                    
                    {/* Tooltip Popup on Rollover */}
                    {activeTooltip && (
                      <div className="absolute top-16 left-6 right-6 z-30 bg-[#1e1e1e] text-white px-3.5 py-2 rounded-xl text-[12px] font-bold shadow-xl border border-white/20 android-modal-enter flex items-center justify-between">
                        <span>📌 {activeTooltip}</span>
                        <button onClick={() => setActiveTooltip(null)} className="text-gray-400 hover:text-white">✕</button>
                      </div>
                    )}

                    <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl text-[13.5px] shadow-xs">
                      <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-500 mb-2">
                        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center text-[12px] font-bold text-slate-900">
                        <span className="text-slate-400">27</span><span className="text-slate-400">28</span><span className="text-slate-400">29</span><span className="text-slate-400">30</span><span className="text-slate-400">31</span><span className="p-1">1</span><span className="p-1">2</span>
                        <span className="p-1">3</span>
                        <span 
                          onMouseEnter={() => setActiveTooltip('Sept 4: 03:30 PM - Tumkuru Inspection')}
                          onMouseLeave={() => setActiveTooltip(null)}
                          className="p-1 bg-[#af2024] text-white rounded-full font-bold cursor-pointer hover:scale-110 transition"
                        >
                          4
                        </span>
                        <span 
                          onMouseEnter={() => setActiveTooltip('Sept 5: 11:00 AM - NHAI Review')}
                          onMouseLeave={() => setActiveTooltip(null)}
                          className="p-1 bg-amber-500 text-white rounded-full font-bold cursor-pointer hover:scale-110 transition"
                        >
                          5
                        </span>
                        <span className="p-1">6</span><span className="p-1">7</span><span className="p-1">8</span><span className="p-1">9</span>
                        <span className="p-1">10</span>
                        <span 
                          onMouseEnter={() => setActiveTooltip('Sept 11: 02:00 PM - Board Strategy')}
                          onMouseLeave={() => setActiveTooltip(null)}
                          className="p-1 bg-indigo-500 text-white rounded-full font-bold cursor-pointer hover:scale-110 transition"
                        >
                          11
                        </span>
                        <span className="p-1">12</span><span className="p-1">13</span><span className="p-1">14</span><span className="p-1">15</span><span className="p-1">16</span>
                        <span className="p-1">17</span><span className="p-1">18</span><span className="p-1">19</span>
                        <span 
                          onMouseEnter={() => setActiveTooltip('Sept 20: 10:30 AM - Tendering Deadline')}
                          onMouseLeave={() => setActiveTooltip(null)}
                          className="p-1 bg-emerald-600 text-white rounded-full font-bold cursor-pointer hover:scale-110 transition"
                        >
                          20
                        </span>
                        <span className="p-1">21</span><span className="p-1">22</span><span className="p-1">23</span>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col gap-1">
                        <div className="text-[11.5px] font-bold text-[#af2024]">Highlighted Activities (Hover dates above):</div>
                        {customTasks.map((t, i) => (
                          <div key={i} className="text-[12px] text-slate-600 font-semibold">• {t.text}</div>
                        ))}
                      </div>

                      <div className="mt-3 flex gap-2">
                        <input 
                          type="text"
                          value={newTaskInput}
                          onChange={(e) => setNewTaskInput(e.target.value)}
                          placeholder="Add task / meeting..."
                          className="flex-1 p-2 text-[12px] font-semibold rounded-xl border border-slate-300 bg-white text-slate-900 outline-none"
                        />
                        <button onClick={() => { if (newTaskInput.trim()) { setCustomTasks([...customTasks, { day: 25, text: newTaskInput }]); setNewTaskInput(''); triggerToast("📅 Task added to calendar!"); } }} className="px-3 py-2 bg-[#af2024] text-white rounded-xl text-[12px] font-bold cursor-pointer">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Trip Planner & AI Route */}
                  <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-6 shadow-sm android-card-transition flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[16px] font-bold flex items-center gap-2">
  <span className="text-[#af2024]">{IconOutlined.mapPin}</span> Trip Planner & AI Route ({currentTripIndex + 1}/{futureTrips.length})
</h3>
                        <div className="flex gap-1.5">
                          <button onClick={() => setCurrentTripIndex((prev) => (prev === 0 ? futureTrips.length - 1 : prev - 1))} className="w-7 h-7 rounded-full glass-button flex items-center justify-center font-bold text-xs cursor-pointer text-slate-900">‹</button>
                          <button onClick={() => setCurrentTripIndex((prev) => (prev === futureTrips.length - 1 ? 0 : prev + 1))} className="w-7 h-7 rounded-full glass-button flex items-center justify-center font-bold text-xs cursor-pointer text-slate-900">›</button>
                        </div>
                      </div>

                      {(() => {
                        const trip = futureTrips[currentTripIndex];
                        return (
                          <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl text-[13.5px] font-normal shadow-xs">
                            <span className="px-2.5 py-0.5 bg-[#af2024]/10 text-[#af2024] font-bold text-[10.5px] rounded-full uppercase tracking-wider">{trip.type}</span>
                            <div className="font-bold mt-2 mb-1 text-slate-900">{trip.destination}</div>
                            <div className="text-emerald-700 font-bold mb-3">AI Route: {trip.route} (<b>{trip.duration}</b>)</div>
                          </div>
                        );
                      })()}
                    </div>

                    <button onClick={() => setShowDriverModal(true)} className="mt-4 w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-[13px] cursor-pointer transition shadow-sm flex items-center justify-center gap-2">
                      <span>📲 Share with my driver</span>
                    </button>
                  </div>

                  {/* Scheduled Material Purchase */}
                  <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-6 shadow-sm android-card-transition flex flex-col justify-between">
                    <div>
                      <h3 className="text-[16px] font-bold mb-4 flex items-center gap-2">
                        <span className="text-[#af2024]">{IconOutlined.box}</span> Scheduled Material Purchase
                      </h3>
                      <div className="p-4 bg-slate-50 border border-slate-300 rounded-2xl text-[13.5px] font-normal shadow-xs">
                        <div className="flex justify-between font-bold mb-2 text-slate-900"><span>Material</span><span>Scheduled Use</span></div>
                        <div className="flex justify-between text-slate-700 py-1.5 border-b border-dashed border-slate-300 font-semibold"><span>Bitumen VG-30</span><span><b>120 Metric Tons</b></span></div>
                        <div className="flex justify-between text-slate-700 pt-1.5 font-semibold mb-3"><span>OPC Cement Grade 53</span><span><b>450 Bags</b></span></div>
                        
                        <div className="pt-3 border-t border-slate-300 flex items-center justify-between bg-emerald-50 p-3.5 rounded-xl border border-emerald-300 shadow-xs">
                          <span className="text-[12px] font-extrabold text-emerald-900 uppercase tracking-wide">📦 Total Available Stock:</span>
                          <span className="text-[13px] font-black text-emerald-700">310 MT | 2,400 Bags</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setShowQueryModal(true)} className="mt-4 w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold text-[13px] cursor-pointer transition shadow-sm flex items-center justify-center gap-2">
                      <span>❓ Raise a query</span>
                    </button>
                  </div>
                </div>

                {/* Work Life Balance Section */}
                <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-200 text-slate-900 rounded-[28px] p-7 shadow-sm android-card-transition">
                  <h3 className="text-[17px] font-bold text-indigo-900 mb-4 flex items-center gap-2.5">
                    <span>🌟</span> Work Life Balance & Personal Milestones
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-5 bg-white border border-indigo-200 rounded-2xl shadow-xs">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-[15px]">Ishotsav 2.0 (Annual Fest)</h4>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-900 font-bold text-[11px] rounded-full">Nov 1, 2026</span>
                      </div>
                      <p className="text-[13px] text-slate-600 font-semibold mb-3">Countdown: <b>58 Days Left</b></p>
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={() => triggerToast("📊 Ishotsav 2.0 prep at 68%: Stage design and sponsor contracts verified.")} className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[12.5px] font-bold cursor-pointer transition">
                          Check Progress
                        </button>
                        <button onClick={() => handleScheduleMeeting("Ishotsav Core Committee")} className="flex-1 py-2 glass-button rounded-xl text-[12.5px] font-bold cursor-pointer transition text-slate-900 border border-slate-300">
                          Schedule meeting
                        </button>
                      </div>
                    </div>

                    <div className="p-5 bg-white border border-indigo-200 rounded-2xl shadow-xs">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-[15px]">Family Vacation (Goa Coastal Retreat)</h4>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-bold text-[11px] rounded-full">Dec 20, 2026</span>
                      </div>
                      <p className="text-[13px] text-slate-600 font-semibold mb-2">Countdown: <b>107 Days Left</b> • <b>75% Complete</b></p>
                      
                      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: '75%' }}></div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 text-[11.5px] font-bold text-slate-700">
                        <div className="flex items-center gap-1"><span>✅</span> Flight booked</div>
                        <div className="flex items-center gap-1"><span>✅</span> Hotel booked</div>
                        <div className="flex items-center gap-1"><span>✅</span> Car services</div>
                        <div className="flex items-center gap-1 text-amber-700"><span>⏳</span> Leave for Goa</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Creative Brainstorming Ideas Input Section */}
                <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-7 shadow-sm android-card-transition">
                  <h3 className="text-[17px] font-bold mb-2 flex items-center gap-2.5">
                    <span>💡</span> Creative Brainstorming Ideas Input
                  </h3>
                  <p className="text-[13.5px] text-slate-600 font-medium mb-4">Capture unstructured strategic thoughts, innovation ideas, or process optimization notes for MDI Private Limited.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input 
                      type="text"
                      value={brainstormInput}
                      onChange={(e) => setBrainstormInput(e.target.value)}
                      placeholder="Type a creative brainstorming thought..."
                      className="flex-1 p-3.5 border border-slate-300 bg-slate-50 text-slate-900 rounded-2xl text-[14px] font-semibold outline-none transition"
                    />
                    <button onClick={() => { if (brainstormInput.trim()) { triggerToast("💡 Brainstorm idea logged securely!"); setBrainstormInput(''); } }} className="px-6 py-3.5 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-bold text-[14px] cursor-pointer transition shadow-md shrink-0">
                      Log Idea 🚀
                    </button>
                  </div>
                </div>

                {/* ==========================================
                    5. COMMAND DISPATCH & AI RECOMMENDED MEETINGS
                   ========================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-7 shadow-sm android-card-transition flex flex-col justify-between">
                    <div>
                      <h3 className="text-[17px] font-bold mb-4 flex items-center gap-2.5">
                        <span className="text-[#af2024]">{IconOutlined.lightning}</span> Send Command to Person or Team
                      </h3>
                      
                      <div className="flex flex-col gap-4">
                        <div>
                          <label className="text-[11.5px] font-bold text-slate-600 uppercase tracking-wider block mb-2">Select Recipient Team / Person</label>
                          <select 
                            value={commandRecipient}
                            onChange={(e) => setCommandRecipient(e.target.value)}
                            className="w-full p-3.5 rounded-2xl border border-slate-300 bg-slate-50 text-slate-900 text-[14px] font-semibold outline-none transition cursor-pointer"
                          >
                            <option>Project Manager (Hubali)</option>
                            <option>Chief Engineer (Tumkuru)</option>
                            <option>Fleet Manager (Kolhapur Yard)</option>
                            <option>Safety Head (Satara)</option>
                            <option>Accounts & Audit Lead</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11.5px] font-bold text-slate-600 uppercase tracking-wider block mb-2">Command Instructions / Voice Note</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="text"
                              value={commandText}
                              onChange={(e) => setCommandText(e.target.value)}
                              placeholder="Type command or click mic..."
                              className="flex-1 p-3.5 rounded-2xl border border-slate-300 bg-slate-50 text-slate-900 text-[14px] font-semibold outline-none transition"
                            />
                            <button 
                              onClick={() => triggerToast("🎤 Voice recording active. Speak command...")}
                              className="w-12 h-12 rounded-2xl bg-[#1e1e1e] text-white flex items-center justify-center shrink-0 cursor-pointer shadow-md hover:bg-black transition"
                              title="Voice Dictation"
                            >
                              {IconOutlined.mic}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        triggerToast(`⚡ Command successfully dispatched to ${commandRecipient}!`);
                        setCommandText('');
                      }} 
                      className="w-full mt-6 py-4 bg-[#af2024] hover:bg-[#92191d] text-white rounded-2xl font-bold text-[14.5px] cursor-pointer transition shadow-lg shadow-[#af2024]/20 flex items-center justify-center gap-2"
                    >
                      <span>Dispatch Command Now</span> ⚡
                    </button>
                  </div>

                  <div className="bg-white border border-slate-300 text-slate-900 rounded-[28px] p-7 shadow-sm android-card-transition flex flex-col justify-between">
                    <div>
                      <h3 className="text-[17px] font-bold mb-4 flex items-center gap-2.5">
                        <span className="text-[#af2024]">{IconOutlined.calendar}</span> AI Recommended Meetings & Site Visits
                      </h3>

                      <div className="flex flex-col gap-3">
                        <div className="p-4 rounded-2xl border bg-slate-50 border-slate-300 flex items-center justify-between gap-3 shadow-xs">
                          <div>
                            <div className="font-bold text-[14px] text-slate-900">Site Visit: Tumkuru Sub-base Inspection</div>
                            <div className="text-[12px] text-slate-600 font-semibold mt-0.5">Today @ 3:30 PM • AI Loss Mitigation</div>
                          </div>
                          <button 
                            onClick={() => triggerToast("✓ Accepted Tumkuru Site Visit invitation")}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[13px] font-bold transition cursor-pointer shrink-0 shadow-sm"
                          >
                            Accept
                          </button>
                        </div>

                        <div className="p-4 rounded-2xl border bg-slate-50 border-slate-300 flex items-center justify-between gap-3 shadow-xs">
                          <div>
                            <div className="font-bold text-[14px] text-slate-900">Meeting: Vendor Payment Review with CFO</div>
                            <div className="text-[12px] text-slate-600 font-semibold mt-0.5">Tomorrow @ 10:00 AM • High Priority</div>
                          </div>
                          <button 
                            onClick={() => triggerToast("📅 Scheduled Vendor Payment Review meeting")}
                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-[13px] font-bold transition cursor-pointer shrink-0 shadow-sm"
                          >
                            Schedule
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-200 text-[12.5px] text-slate-600 text-center font-bold">
                      🤖 AI continuously synchronizes with Sushant’s calendar & site telemetry.
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* =========================================================================
                 DEDICATED MODULE PAGES WITH RELEVANT ANDROID MATERIAL CARDS (GRID)
                 ========================================================================= */
              <div className="flex flex-col gap-6 android-slide-enter">
                <div className="flex justify-between items-center bg-white border border-slate-300 rounded-[28px] p-6 shadow-sm">
                  <div>
                    <h2 className="text-[24px] font-black text-slate-900 capitalize">{activeTab.replace(/([A-Z])/g, ' $1')} Management Module</h2>
                    <p className="text-[13.5px] text-slate-600 font-medium mt-1">Enterprise operational data, relevant menu cards, and real-time telemetry.</p>
                  </div>
                  <button onClick={() => setActiveTab('command')} className="px-5 py-2.5 glass-button rounded-2xl font-bold text-[13.5px] text-slate-900 cursor-pointer">
                    ← Back to Command Centre
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {menuPageContent[activeTab]?.map((card, idx) => (
                    <div key={idx} className="bg-white border border-slate-300 rounded-[24px] p-6 shadow-sm android-card-transition flex flex-col justify-between gap-5">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-3xl p-3 bg-slate-100 rounded-2xl">{card.icon}</span>
                          <span className="px-3 py-1 bg-slate-100 text-slate-700 font-extrabold text-[11px] rounded-full border border-slate-200 uppercase">{card.badge}</span>
                        </div>
                        <h4 className="text-[17px] font-extrabold text-slate-900 mb-1">{card.title}</h4>
                        <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{card.subtitle}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                        <span className="text-[16px] font-black text-blue-700">{card.stat}</span>
                        <button onClick={() => triggerToast(`⚡ Action executed: ${card.action} for ${card.title}`)} className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white rounded-xl text-[12.5px] font-bold shadow-sm transition cursor-pointer">
                          {card.action} →
                        </button>
                      </div>
                    </div>
                  )) || (
                    <div className="p-8 bg-white border border-slate-300 rounded-[24px] text-slate-700 font-semibold col-span-4 text-center">
                      No specific cards configured for this module yet. All systems operational.
                    </div>
                  )}
                </div>

                <div className="bg-white border border-slate-300 rounded-[28px] p-7 shadow-sm android-card-transition">
                  <h3 className="text-[17px] font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                    <span>📈</span> Detailed {activeTab.replace(/([A-Z])/g, ' $1')} Analytics & Telemetry Grid
                  </h3>
                  <div className="p-6 bg-slate-50 border border-slate-300 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <div className="text-[14px] font-extrabold text-slate-900">Module Optimization Status</div>
                      <div className="text-[13px] text-slate-600 mt-0.5">All subprocesses mapped to MDI Private Limited enterprise framework.</div>
                    </div>
                    <button onClick={() => triggerToast(`🚀 Full sync initiated for ${activeTab} module!`)} className="px-5 py-3 bg-[#af2024] hover:bg-[#92191d] text-white rounded-xl font-bold text-[13.5px] shadow-md transition cursor-pointer">
                      Run Full Module Diagnostics 🚀
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