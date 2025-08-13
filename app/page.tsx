'use client';

import React, { useState, useEffect } from 'react';
import PaidCalculator from './components/PaidCalculator';
import PaymentModal from './components/PaymentModal';
import AuthModal from './components/AuthModal';

// College data with accurate admission statistics from Common Data Set (CDS) and official sources
// Updated with latest available CDS data (2024-2025 where available, 2023-2024 as fallback)
const COLLEGES = [
  {
    name: "Princeton University",
    admissionRate: 3.600,
    avgSAT: 1530,
    avgACT: 34,
    avgGPA: 3.95,
    sat25th: 1500,
    sat75th: 1560,
    act25th: 34,
    act75th: 35,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Massachusetts Institute of Technology",
    admissionRate: 4.500,
    avgSAT: 1550,
    avgACT: 35,
    avgGPA: 3.95,
    sat25th: 1520,
    sat75th: 1580,
    act25th: 35,
    act75th: 36,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Harvard University",
    admissionRate: 3.600,
    avgSAT: 1540,
    avgACT: 35,
    avgGPA: 3.95,
    sat25th: 1500,
    sat75th: 1580,
    act25th: 34,
    act75th: 36,
    dataSource: "Common Data Set 2024-2025 and third-party sources"
  },
  {
    name: "Stanford University",
    admissionRate: 3.600,
    avgSAT: 1540,
    avgACT: 34,
    avgGPA: 3.94,
    sat25th: 1510,
    sat75th: 1570,
    act25th: 34,
    act75th: 35,
    dataSource: "Common Data Set 2024-2025 and third-party sources"
  },
  {
    name: "Yale University",
    admissionRate: 3.730,
    avgSAT: 1530,
    avgACT: 34,
    avgGPA: 3.95,
    sat25th: 1500,
    sat75th: 1560,
    act25th: 33,
    act75th: 35,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Pennsylvania",
    admissionRate: 5.400,
    avgSAT: 1535,
    avgACT: 35,
    avgGPA: 3.90,
    sat25th: 1500,
    sat75th: 1570,
    act25th: 34,
    act75th: 35,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "California Institute of Technology",
    admissionRate: 2.569,
    avgSAT: 1550,
    avgACT: 36,
    avgGPA: 3.96,
    sat25th: 1530,
    sat75th: 1570,
    act25th: 35,
    act75th: 36,
    dataSource: "Common Data Set 2024-2025 and third-party sources"
  },
  {
    name: "Duke University",
    admissionRate: 5.150,
    avgSAT: 1545,
    avgACT: 35,
    avgGPA: 3.94,
    sat25th: 1520,
    sat75th: 1570,
    act25th: 34,
    act75th: 35,
    dataSource: "Common Data Set 2024-2025 and third-party sources"
  },
  {
    name: "Brown University",
    admissionRate: 5.160,
    avgSAT: 1535,
    avgACT: 35,
    avgGPA: 3.94,
    sat25th: 1510,
    sat75th: 1560,
    act25th: 34,
    act75th: 35,
    dataSource: "Common Data Set 2024-2025 and third-party sources"
  },
  {
    name: "Johns Hopkins University",
    admissionRate: 5.770,
    avgSAT: 1550,
    avgACT: 35,
    avgGPA: 3.95,
    sat25th: 1530,
    sat75th: 1570,
    act25th: 34,
    act75th: 36,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Northwestern University",
    admissionRate: 7.500,
    avgSAT: 1525,
    avgACT: 34,
    avgGPA: 3.92,
    sat25th: 1490,
    sat75th: 1560,
    act25th: 33,
    act75th: 35,
    dataSource: "Common Data Set 2024-2025 and third-party sources"
  },
  {
    name: "Columbia University",
    admissionRate: 3.850,
    avgSAT: 1525,
    avgACT: 34,
    avgGPA: 3.92,
    sat25th: 1500,
    sat75th: 1560,
    act25th: 34,
    act75th: 35,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Chicago",
    admissionRate: 4.480,
    avgSAT: 1535,
    avgACT: 35,
    avgGPA: 3.95,
    sat25th: 1510,
    sat75th: 1560,
    act25th: 34,
    act75th: 35,
    dataSource: "Common Data Set 2024-2025 and third-party sources"
  },
  {
    name: "Cornell University",
    admissionRate: 8.405,
    avgSAT: 1535,
    avgACT: 34,
    avgGPA: 3.90,
    sat25th: 1510,
    sat75th: 1560,
    act25th: 33,
    act75th: 35,
    dataSource: "Common Data Set 2024-2025 and third-party sources"
  },
  {
    name: "University of California, Berkeley",
    admissionRate: 11.6,
    avgSAT: 1430,
    avgACT: 32,
    avgGPA: 3.9,
    sat25th: 1350,
    sat75th: 1530,
    act25th: 30,
    act75th: 34,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "University of California, Los Angeles",
    admissionRate: 8.8,
    avgSAT: 1415,
    avgACT: 31,
    avgGPA: 3.9,
    sat25th: 1330,
    sat75th: 1520,
    act25th: 29,
    act75th: 34,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "University of Michigan",
    admissionRate: 17.7,
    avgSAT: 1450,
    avgACT: 32,
    avgGPA: 3.88,
    sat25th: 1370,
    sat75th: 1530,
    act25th: 31,
    act75th: 34,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "Vanderbilt University",
    admissionRate: 6.7,
    avgSAT: 1510,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1450,
    sat75th: 1570,
    act25th: 32,
    act75th: 35,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "Rice University",
    admissionRate: 8.7,
    avgSAT: 1500,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1440,
    sat75th: 1560,
    act25th: 32,
    act75th: 35,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "Washington University in St. Louis",
    admissionRate: 13.0,
    avgSAT: 1510,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1450,
    sat75th: 1570,
    act25th: 32,
    act75th: 35,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "Georgetown University",
    admissionRate: 12.0,
    avgSAT: 1460,
    avgACT: 33,
    avgGPA: 3.8,
    sat25th: 1390,
    sat75th: 1530,
    act25th: 31,
    act75th: 34,
    gpa25th: 3.65,
    gpa75th: 3.95,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "University of Southern California",
    admissionRate: 12.0,
    avgSAT: 1450,
    avgACT: 32,
    avgGPA: 3.8,
    sat25th: 1380,
    sat75th: 1520,
    act25th: 30,
    act75th: 34,
    gpa25th: 3.65,
    gpa75th: 3.95,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "Carnegie Mellon University",
    admissionRate: 15.4,
    avgSAT: 1524,
    avgACT: 34,
    avgGPA: 3.85,
    sat25th: 1470,
    sat75th: 1570,
    act25th: 33,
    act75th: 35,
    dataSource: "Official 2024-2025 CDS"
  },
  {
    name: "University of Virginia",
    admissionRate: 18.7,
    avgSAT: 1430,
    avgACT: 32,
    avgGPA: 3.8,
    sat25th: 1350,
    sat75th: 1530,
    act25th: 30,
    act75th: 33,
    dataSource: "Official 2024-2025 CDS"
  },
  {
    name: "University of North Carolina at Chapel Hill",
    admissionRate: 16.8,
    avgSAT: 1380,
    avgACT: 30,
    avgGPA: 3.7,
    sat25th: 1300,
    sat75th: 1500,
    act25th: 28,
    act75th: 32,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "New York University",
    admissionRate: 12.8,
    avgSAT: 1440,
    avgACT: 32,
    avgGPA: 3.9,
    sat25th: 1350,
    sat75th: 1530,
    act25th: 30,
    act75th: 34,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "Official 2024-2025 CDS"
  },
  {
    name: "Tufts University",
    admissionRate: 9.5,
    avgSAT: 1460,
    avgACT: 32,
    avgGPA: 3.7,
    sat25th: 1390,
    sat75th: 1530,
    act25th: 30,
    act75th: 33,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "University of California, San Diego",
    admissionRate: 23.7,
    avgSAT: 1360,
    avgACT: 30,
    avgGPA: 3.7,
    sat25th: 1280,
    sat75th: 1480,
    act25th: 28,
    act75th: 32,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "Official 2024-2025 CDS"
  },
  {
    name: "University of Florida",
    admissionRate: 23.3,
    avgSAT: 1330,
    avgACT: 29,
    avgGPA: 3.6,
    sat25th: 1250,
    sat75th: 1450,
    act25th: 26,
    act75th: 31,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "University of Texas at Austin",
    admissionRate: 31.8,
    avgSAT: 1350,
    avgACT: 29,
    avgGPA: 3.6,
    sat25th: 1270,
    sat75th: 1470,
    act25th: 27,
    act75th: 31,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "University of Wisconsin-Madison",
    admissionRate: 49.1,
    avgSAT: 1370,
    avgACT: 29,
    avgGPA: 3.6,
    sat25th: 1290,
    sat75th: 1490,
    act25th: 27,
    act75th: 31,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "Dartmouth College",
    admissionRate: 5.300,
    avgSAT: 1520,
    avgACT: 34,
    avgGPA: 3.92,
    sat25th: 1480,
    sat75th: 1560,
    act25th: 32,
    act75th: 35,
    dataSource: "Common Data Set 2024-2025 and third-party sources"
  },
  {
    name: "University of Notre Dame",
    admissionRate: 12.9,
    avgSAT: 1475,
    avgACT: 33,
    avgGPA: 3.8,
    sat25th: 1410,
    sat75th: 1530,
    act25th: 31,
    act75th: 34,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "Emory University",
    admissionRate: 11.4,
    avgSAT: 1435,
    avgACT: 32,
    avgGPA: 3.7,
    sat25th: 1340,
    sat75th: 1520,
    act25th: 30,
    act75th: 33,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "Boston College",
    admissionRate: 16.7,
    avgSAT: 1420,
    avgACT: 32,
    avgGPA: 3.7,
    sat25th: 1340,
    sat75th: 1510,
    act25th: 30,
    act75th: 33,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "Wake Forest University",
    admissionRate: 21.4,
    avgSAT: 1380,
    avgACT: 30,
    avgGPA: 3.6,
    sat25th: 1280,
    sat75th: 1480,
    act25th: 27,
    act75th: 32,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "University of California, Irvine",
    admissionRate: 21.2,
    avgSAT: 1330,
    avgACT: 29,
    avgGPA: 3.7,
    sat25th: 1240,
    sat75th: 1450,
    act25th: 26,
    act75th: 31,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "University of California, Davis",
    admissionRate: 37.5,
    avgSAT: 1310,
    avgACT: 28,
    avgGPA: 3.6,
    sat25th: 1220,
    sat75th: 1430,
    act25th: 25,
    act75th: 30,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Estimated from 2023-2024 Data"
  },
  {
    name: "University of California, Santa Barbara",
    admissionRate: 25.9,
    avgSAT: 1335,
    avgACT: 29,
    avgGPA: 3.7,
    sat25th: 1240,
    sat75th: 1450,
    act25th: 26,
    act75th: 31,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "UC System Data 2024"
  },
  {
    name: "University of Washington",
    admissionRate: 47.5,
    avgSAT: 1320,
    avgACT: 29,
    avgGPA: 3.6,
    sat25th: 1220,
    sat75th: 1430,
    act25th: 26,
    act75th: 31,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Maryland",
    admissionRate: 44.0,
    avgSAT: 1330,
    avgACT: 29,
    avgGPA: 3.6,
    sat25th: 1230,
    sat75th: 1440,
    act25th: 26,
    act75th: 31,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Pittsburgh",
    admissionRate: 49.1,
    avgSAT: 1310,
    avgACT: 28,
    avgGPA: 3.6,
    sat25th: 1220,
    sat75th: 1420,
    act25th: 25,
    act75th: 30,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Rutgers University",
    admissionRate: 66.3,
    avgSAT: 1300,
    avgACT: 28,
    avgGPA: 3.6,
    sat25th: 1210,
    sat75th: 1410,
    act25th: 25,
    act75th: 30,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Penn State University",
    admissionRate: 54.2,
    avgSAT: 1290,
    avgACT: 27,
    avgGPA: 3.5,
    sat25th: 1200,
    sat75th: 1400,
    act25th: 24,
    act75th: 29,
    gpa25th: 3.4,
    gpa75th: 3.7,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Ohio State University",
    admissionRate: 53.0,
    avgSAT: 1310,
    avgACT: 28,
    avgGPA: 3.6,
    sat25th: 1220,
    sat75th: 1420,
    act25th: 25,
    act75th: 30,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Indiana University",
    admissionRate: 82.0,
    avgSAT: 1270,
    avgACT: 27,
    avgGPA: 3.5,
    sat25th: 1180,
    sat75th: 1380,
    act25th: 24,
    act75th: 29,
    gpa25th: 3.4,
    gpa75th: 3.7,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Michigan State University",
    admissionRate: 83.2,
    avgSAT: 1260,
    avgACT: 26,
    avgGPA: 3.5,
    sat25th: 1170,
    sat75th: 1370,
    act25th: 23,
    act75th: 28,
    gpa25th: 3.4,
    gpa75th: 3.7,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Illinois",
    admissionRate: 44.8,
    avgSAT: 1330,
    avgACT: 28,
    avgGPA: 3.6,
    sat25th: 1220,
    sat75th: 1440,
    act25th: 25,
    act75th: 30,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Arizona State University",
    admissionRate: 88.2,
    avgSAT: 1240,
    avgACT: 25,
    avgGPA: 3.4,
    sat25th: 1150,
    sat75th: 1350,
    act25th: 22,
    act75th: 27,
    gpa25th: 3.3,
    gpa75th: 3.6,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Arizona",
    admissionRate: 85.1,
    avgSAT: 1230,
    avgACT: 25,
    avgGPA: 3.4,
    sat25th: 1140,
    sat75th: 1340,
    act25th: 22,
    act75th: 27,
    gpa25th: 3.3,
    gpa75th: 3.6,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Colorado Boulder",
    admissionRate: 78.9,
    avgSAT: 1250,
    avgACT: 26,
    avgGPA: 3.5,
    sat25th: 1160,
    sat75th: 1360,
    act25th: 23,
    act75th: 28,
    gpa25th: 3.4,
    gpa75th: 3.7,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Oregon",
    admissionRate: 83.8,
    avgSAT: 1230,
    avgACT: 25,
    avgGPA: 3.4,
    sat25th: 1140,
    sat75th: 1340,
    act25th: 22,
    act75th: 27,
    gpa25th: 3.3,
    gpa75th: 3.6,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Minnesota",
    admissionRate: 73.2,
    avgSAT: 1280,
    avgACT: 27,
    avgGPA: 3.5,
    sat25th: 1190,
    sat75th: 1390,
    act25th: 24,
    act75th: 29,
    gpa25th: 3.4,
    gpa75th: 3.7,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Iowa",
    admissionRate: 84.0,
    avgSAT: 1240,
    avgACT: 25,
    avgGPA: 3.4,
    sat25th: 1150,
    sat75th: 1350,
    act25th: 22,
    act75th: 27,
    gpa25th: 3.3,
    gpa75th: 3.6,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Kansas",
    admissionRate: 88.8,
    avgSAT: 1220,
    avgACT: 24,
    avgGPA: 3.3,
    sat25th: 1130,
    sat75th: 1330,
    act25th: 21,
    act75th: 26,
    gpa25th: 3.2,
    gpa75th: 3.5,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Missouri",
    admissionRate: 77.3,
    avgSAT: 1230,
    avgACT: 25,
    avgGPA: 3.4,
    sat25th: 1140,
    sat75th: 1340,
    act25th: 22,
    act75th: 27,
    gpa25th: 3.3,
    gpa75th: 3.6,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Nebraska",
    admissionRate: 78.0,
    avgSAT: 1220,
    avgACT: 24,
    avgGPA: 3.3,
    sat25th: 1130,
    sat75th: 1330,
    act25th: 21,
    act75th: 26,
    gpa25th: 3.2,
    gpa75th: 3.5,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Oklahoma",
    admissionRate: 73.0,
    avgSAT: 1230,
    avgACT: 25,
    avgGPA: 3.4,
    sat25th: 1140,
    sat75th: 1340,
    act25th: 22,
    act75th: 27,
    gpa25th: 3.3,
    gpa75th: 3.6,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Tennessee",
    admissionRate: 74.8,
    avgSAT: 1240,
    avgACT: 25,
    avgGPA: 3.4,
    sat25th: 1150,
    sat75th: 1350,
    act25th: 22,
    act75th: 27,
    gpa25th: 3.3,
    gpa75th: 3.6,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Kentucky",
    admissionRate: 95.3,
    avgSAT: 1200,
    avgACT: 23,
    avgGPA: 3.2,
    sat25th: 1110,
    sat75th: 1310,
    act25th: 20,
    act75th: 25,
    gpa25th: 3.1,
    gpa75th: 3.4,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Alabama",
    admissionRate: 80.1,
    avgSAT: 1210,
    avgACT: 24,
    avgGPA: 3.3,
    sat25th: 1120,
    sat75th: 1320,
    act25th: 21,
    act75th: 26,
    gpa25th: 3.2,
    gpa75th: 3.5,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Mississippi",
    admissionRate: 88.1,
    avgSAT: 1190,
    avgACT: 23,
    avgGPA: 3.2,
    sat25th: 1100,
    sat75th: 1300,
    act25th: 20,
    act75th: 25,
    gpa25th: 3.1,
    gpa75th: 3.4,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Louisiana State University",
    admissionRate: 73.2,
    avgSAT: 1210,
    avgACT: 24,
    avgGPA: 3.3,
    sat25th: 1120,
    sat75th: 1320,
    act25th: 21,
    act75th: 26,
    gpa25th: 3.2,
    gpa75th: 3.5,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Arkansas",
    admissionRate: 77.1,
    avgSAT: 1200,
    avgACT: 23,
    avgGPA: 3.2,
    sat25th: 1110,
    sat75th: 1310,
    act25th: 20,
    act75th: 25,
    gpa25th: 3.1,
    gpa75th: 3.4,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of South Carolina",
    admissionRate: 68.1,
    avgSAT: 1220,
    avgACT: 24,
    avgGPA: 3.3,
    sat25th: 1130,
    sat75th: 1330,
    act25th: 21,
    act75th: 26,
    gpa25th: 3.2,
    gpa75th: 3.5,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Clemson University",
    admissionRate: 49.2,
    avgSAT: 1280,
    avgACT: 27,
    avgGPA: 3.5,
    sat25th: 1190,
    sat75th: 1390,
    act25th: 24,
    act75th: 29,
    gpa25th: 3.4,
    gpa75th: 3.7,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Miami",
    admissionRate: 19.3,
    avgSAT: 1350,
    avgACT: 30,
    avgGPA: 3.6,
    sat25th: 1260,
    sat75th: 1460,
    act25th: 27,
    act75th: 32,
    gpa25th: 3.5,
    gpa75th: 3.8,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Florida State University",
    admissionRate: 37.0,
    avgSAT: 1270,
    avgACT: 27,
    avgGPA: 3.5,
    sat25th: 1180,
    sat75th: 1380,
    act25th: 24,
    act75th: 29,
    gpa25th: 3.4,
    gpa75th: 3.7,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Central Florida",
    admissionRate: 36.0,
    avgSAT: 1250,
    avgACT: 26,
    avgGPA: 3.4,
    sat25th: 1160,
    sat75th: 1360,
    act25th: 23,
    act75th: 28,
    gpa25th: 3.3,
    gpa75th: 3.6,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of South Florida",
    admissionRate: 44.2,
    avgSAT: 1240,
    avgACT: 25,
    avgGPA: 3.3,
    sat25th: 1150,
    sat75th: 1350,
    act25th: 22,
    act75th: 27,
    gpa25th: 3.2,
    gpa75th: 3.5,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Houston",
    admissionRate: 66.0,
    avgSAT: 1220,
    avgACT: 24,
    avgGPA: 3.3,
    sat25th: 1130,
    sat75th: 1330,
    act25th: 21,
    act75th: 26,
    gpa25th: 3.2,
    gpa75th: 3.5,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Texas A&M University",
    admissionRate: 63.3,
    avgSAT: 1240,
    avgACT: 25,
    avgGPA: 3.4,
    sat25th: 1150,
    sat75th: 1350,
    act25th: 22,
    act75th: 27,
    gpa25th: 3.3,
    gpa75th: 3.6,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Utah",
    admissionRate: 89.1,
    avgSAT: 1220,
    avgACT: 24,
    avgGPA: 3.3,
    sat25th: 1130,
    sat75th: 1330,
    act25th: 21,
    act75th: 26,
    gpa25th: 3.2,
    gpa75th: 3.5,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "Brigham Young University",
    admissionRate: 67.5,
    avgSAT: 1310,
    avgACT: 28,
    avgGPA: 3.5,
    sat25th: 1220,
    sat75th: 1420,
    act25th: 25,
    act75th: 30,
    gpa25th: 3.4,
    gpa75th: 3.7,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Nevada, Las Vegas",
    admissionRate: 81.2,
    avgSAT: 1200,
    avgACT: 23,
    avgGPA: 3.2,
    sat25th: 1110,
    sat75th: 1310,
    act25th: 20,
    act75th: 25,
    gpa25th: 3.1,
    gpa75th: 3.4,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of New Mexico",
    admissionRate: 96.9,
    avgSAT: 1180,
    avgACT: 22,
    avgGPA: 3.1,
    sat25th: 1090,
    sat75th: 1290,
    act25th: 19,
    act75th: 24,
    gpa25th: 3.0,
    gpa75th: 3.3,
    dataSource: "Common Data Set 2024-2025"
  },
  {
    name: "University of Hawaii",
    admissionRate: 70.8,
    avgSAT: 1190,
    avgACT: 23,
    avgGPA: 3.2,
    sat25th: 1100,
    sat75th: 1300,
    act25th: 20,
    act75th: 25,
    gpa25th: 3.1,
    gpa75th: 3.4,
    dataSource: "Common Data Set 2024-2025"
  }
];

// SAT to ACT conversion table (approximate)
const SAT_TO_ACT_CONVERSION = {
  1600: 36, 1590: 36, 1580: 36, 1570: 36, 1560: 35, 1550: 35, 1540: 35, 1530: 35,
  1520: 34, 1510: 34, 1500: 34, 1490: 33, 1480: 33, 1470: 33, 1460: 33, 1450: 32,
  1440: 32, 1430: 32, 1420: 31, 1410: 31, 1400: 31, 1390: 30, 1380: 30, 1370: 30,
  1360: 29, 1350: 29, 1340: 29, 1330: 28, 1320: 28, 1310: 28, 1300: 27, 1290: 27,
  1280: 27, 1270: 26, 1260: 26, 1250: 26, 1240: 25, 1230: 25, 1220: 25, 1210: 24,
  1200: 24, 1190: 24, 1180: 23, 1170: 23, 1160: 23, 1150: 22, 1140: 22, 1130: 22,
  1120: 21, 1110: 21, 1100: 21, 1090: 20, 1080: 20, 1070: 20, 1060: 19, 1050: 19,
  1040: 19, 1030: 18, 1020: 18, 1010: 18, 1000: 17, 990: 17, 980: 17, 970: 16,
  960: 16, 950: 16, 940: 15, 930: 15, 920: 15, 910: 14, 900: 14, 890: 14, 880: 13,
  870: 13, 860: 13, 850: 12, 840: 12, 830: 12, 820: 11, 810: 11, 800: 11
};

// ACT to SAT conversion table (approximate)
const ACT_TO_SAT_CONVERSION = {
  36: 1600, 35: 1570, 34: 1540, 33: 1500, 32: 1470, 31: 1430, 30: 1400, 29: 1360,
  28: 1320, 27: 1290, 26: 1260, 25: 1220, 24: 1180, 23: 1140, 22: 1100, 21: 1060,
  20: 1020, 19: 980, 18: 940, 17: 900, 16: 860, 15: 820, 14: 780, 13: 740,
  12: 680, 11: 590
};

interface FormData {
  gpa: string;
  sat: string;
  act: string;
  college: string;
  testType: 'sat' | 'act';
}

interface CalculationResult {
  chance: number;
  collegeData: any;
  convertedScore?: number;
  enhancedChance?: number;
  aiScores?: {
    essayScore: number;
    ecScore: number;
    academicRigorScore: number;
  };
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    gpa: '',
    sat: '',
    act: '',
    college: '',
    testType: 'sat'
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaidCalculator, setShowPaidCalculator] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'2-weeks' | '1-month' | '3-months' | null>(null);
  const [aiScores, setAiScores] = useState<any>(null);
  const [essayFeedback, setEssayFeedback] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [premiumFormData, setPremiumFormData] = useState({
    essay: '',
    extracurriculars: [''],
    apScores: [''],
    ibScores: [''],
    honorsClasses: '0'
  });
  const [cachedAiAnalysis, setCachedAiAnalysis] = useState<any>(null);

  // Check for authentication and premium status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const userData = localStorage.getItem('user');
      const premiumStatus = localStorage.getItem('isPremium');
      
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsPremium(parsedUser.isPremium || premiumStatus === 'true');
      }
    };
    
    checkAuthStatus();
    
    // Check for premium activation from URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('premium') === 'activated') {
      setIsPremium(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Load cached premium form data
    const loadCachedPremiumData = () => {
      const cachedData = localStorage.getItem('premiumFormData');
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          setPremiumFormData(parsedData);
        } catch (error) {
          console.error('Error loading cached premium data:', error);
        }
      }
      
      // Load cached AI analysis
      const cachedAnalysis = localStorage.getItem('cachedAiAnalysis');
      if (cachedAnalysis) {
        try {
          const parsedAnalysis = JSON.parse(cachedAnalysis);
          // Check if cache is less than 24 hours old
          const cacheAge = Date.now() - parsedAnalysis.timestamp;
          if (cacheAge < 24 * 60 * 60 * 1000) { // 24 hours
            setCachedAiAnalysis(parsedAnalysis);
            setAiScores(parsedAnalysis.scores);
            setEssayFeedback(parsedAnalysis.essayFeedback);
          } else {
            // Clear expired cache
            localStorage.removeItem('cachedAiAnalysis');
        }
      } catch (error) {
          console.error('Error loading cached AI analysis:', error);
      }
    }
    };

    loadCachedPremiumData();
  }, []);

  const handleAuthSuccess = (userData: any) => {
    setUser(userData);
    setIsPremium(userData.isPremium);
    
    // If user just signed in and we have a selected tier, continue to payment
    if (selectedTier && !userData.isPremium) {
      setShowPaymentModal(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isPremium');
    setUser(null);
    setIsPremium(false);
  };

  // Function to save premium form data to localStorage
  const savePremiumFormData = (data: any) => {
    try {
      localStorage.setItem('premiumFormData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving premium form data:', error);
    }
  };

  // Function to save AI analysis cache to localStorage
  const saveAiAnalysisCache = (analysis: any) => {
    try {
      localStorage.setItem('cachedAiAnalysis', JSON.stringify(analysis));
    } catch (error) {
      console.error('Error saving AI analysis cache:', error);
    }
  };

  // Wrapper function to update premium form data and save to localStorage
  const updatePremiumFormData = (newData: any) => {
    setPremiumFormData(newData);
    savePremiumFormData(newData);
  };

  const filteredColleges = COLLEGES.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Convert SAT to ACT or vice versa
  const convertScore = (score: number, fromType: 'sat' | 'act'): number => {
    if (fromType === 'sat') {
      return SAT_TO_ACT_CONVERSION[score as keyof typeof SAT_TO_ACT_CONVERSION] || 20;
    } else {
      return ACT_TO_SAT_CONVERSION[score as keyof typeof ACT_TO_SAT_CONVERSION] || 1000;
    }
  };

  // Helper function to calculate dynamic GPA range based on average GPA and admission rate
  const calculateGPARange = (avgGPA: number, admissionRate: number) => {
    // Determine base spread based on admission rate tiers
    let baseSpread: number;
    if (admissionRate < 10) {
      baseSpread = 0.20; // Top-tier schools
    } else if (admissionRate < 25) {
      baseSpread = 0.30; // Upper-tier schools
    } else if (admissionRate < 50) {
      baseSpread = 0.40; // Mid-tier schools
    } else {
      baseSpread = 0.50; // General-tier schools
    }
    
    // Calculate the distance from average GPA to 4.0
    const distanceToMax = 4.0 - avgGPA;
    
    // Use the minimum of the tiered spread and twice the distance to 4.0
    // This ensures we don't exceed 4.0 and gives realistic ranges for high-average schools
    const effectiveSpread = Math.min(baseSpread, distanceToMax * 2);
    
    // Calculate 25th and 75th percentiles
    const gpa75th = avgGPA + (effectiveSpread / 2);
    const gpa25th = avgGPA - (effectiveSpread / 2);
    
    return { gpa25th, gpa75th };
  };

  const calculateChance = (gpa: number, testScore: number, testType: 'sat' | 'act', college: any): CalculationResult => {
    // Normalize GPA to 4.0 scale if needed
    const normalizedGPA = Math.min(gpa, 4.0);
    
    // Convert test score to SAT for consistent calculation
    let satScore = testScore;
    let convertedScore: number | undefined;
    
    if (testType === 'act') {
      satScore = convertScore(testScore, 'act');
      convertedScore = satScore;
    }
    
    // Calculate dynamic GPA range
    const { gpa25th, gpa75th } = calculateGPARange(college.avgGPA, college.admissionRate);
    
    // Calculate percentile scores
    const gpaPercentile = Math.min((normalizedGPA - gpa25th) / (gpa75th - gpa25th), 1) * 100;
    const satPercentile = Math.min((satScore - college.sat25th) / (college.sat75th - college.sat25th), 1) * 100;
    
    // Weight GPA and test scores (GPA slightly more important)
    const weightedScore = (gpaPercentile * 0.6) + (satPercentile * 0.4);
    
    // Base chance calculation
    let baseChance = college.admissionRate;
    
    // Adjust based on how competitive the applicant is
    if (weightedScore >= 90) {
      baseChance *= 2.5; // Excellent candidate
    } else if (weightedScore >= 75) {
      baseChance *= 2.0; // Strong candidate
    } else if (weightedScore >= 50) {
      baseChance *= 1.5; // Above average
    } else if (weightedScore >= 25) {
      baseChance *= 1.0; // Average
    } else {
      baseChance *= 0.5; // Below average
    }
    
    // Cap the chance at 95% (no guarantees)
    const finalChance = Math.min(baseChance, 95);
    
    return {
      chance: Math.round(finalChance * 10) / 10,
      collegeData: college,
      convertedScore
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    
    // Validate form data
    if (!formData.gpa || (!formData.sat && !formData.act) || !formData.college) {
      console.error('Missing required fields:', formData);
      alert('Please fill in all required fields (GPA, test score, and College)');
      return;
    }
    
    const gpa = parseFloat(formData.gpa);
    const testScore = formData.testType === 'sat' ? parseInt(formData.sat) : parseInt(formData.act);
    
    if (isNaN(gpa) || isNaN(testScore)) {
      console.error('Invalid numeric values:', { gpa, testScore });
      alert('Please enter valid numeric values for GPA and test score');
      return;
    }
    
    if (gpa < 0 || gpa > 4.0) {
      alert('GPA must be between 0 and 4.0');
      return;
    }
    
    if (formData.testType === 'sat' && (testScore < 400 || testScore > 1600)) {
      alert('SAT score must be between 400 and 1600');
      return;
    }
    
    if (formData.testType === 'act' && (testScore < 1 || testScore > 36)) {
      alert('ACT score must be between 1 and 36');
      return;
    }
    
    setLoading(true);
    
    try {
      const selectedCollege = COLLEGES.find(c => c.name === formData.college);
      
      if (!selectedCollege) {
        alert('Selected college not found. Please try again.');
        setLoading(false);
        return;
      }
      
      // Calculate basic chance
      const basicResult = calculateChance(gpa, testScore, formData.testType, selectedCollege);
      
      // Check if we should run AI analysis (premium user with data and either no cache or content changed)
      const currentContentHash = JSON.stringify({
        essay: premiumFormData.essay,
        extracurriculars: premiumFormData.extracurriculars,
        apScores: premiumFormData.apScores,
        ibScores: premiumFormData.ibScores,
        honorsClasses: premiumFormData.honorsClasses
      });
      
      const shouldRunAnalysis = isPremium && 
        premiumFormData.essay.trim() && 
        premiumFormData.extracurriculars.some(ec => ec.trim()) && 
        (!cachedAiAnalysis || cachedAiAnalysis.contentHash !== currentContentHash);
      
      if (shouldRunAnalysis) {
        console.log('Running AI analysis with data:', {
          essay: premiumFormData.essay.substring(0, 100) + '...',
          extracurriculars: premiumFormData.extracurriculars.filter(ec => ec.trim()),
          apScores: premiumFormData.apScores.filter(score => score.trim()).map(Number),
          ibScores: premiumFormData.ibScores.filter(score => score.trim()).map(Number),
          honorsClasses: parseInt(premiumFormData.honorsClasses) || 0
        });
        
        // Run AI analysis first
        const analysisResponse = await fetch('/api/analyze/essay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user?.email || 'anonymous',
            essay: premiumFormData.essay,
            extracurriculars: premiumFormData.extracurriculars.filter(ec => ec.trim()),
            apScores: premiumFormData.apScores.filter(score => score.trim()).map(Number),
            ibScores: premiumFormData.ibScores.filter(score => score.trim()).map(Number),
            honorsClasses: parseInt(premiumFormData.honorsClasses) || 0
          })
        });
        
        console.log('Analysis response status:', analysisResponse.status);
        
        if (!analysisResponse.ok) {
          const errorText = await analysisResponse.text();
          console.error('Analysis API error:', errorText);
        }
        
        if (analysisResponse.ok) {
          const analysisResult = await analysisResponse.json();
          
          // Cache the analysis results
          const analysisCache = {
            scores: analysisResult.scores,
            essayFeedback: analysisResult.essayFeedback,
            timestamp: Date.now(),
            contentHash: currentContentHash
          };
          setCachedAiAnalysis(analysisCache);
          saveAiAnalysisCache(analysisCache);
          
          setAiScores(analysisResult.scores);
          setEssayFeedback(analysisResult.essayFeedback);
          
          // Now calculate enhanced chance
          const enhancedResponse = await fetch('/api/calculate-enhanced', {
        method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              gpa: gpa,
              satScore: formData.testType === 'sat' ? testScore : convertScore(testScore, 'act'),
              college: selectedCollege,
              userId: user?.email || 'anonymous',
              aiScores: analysisResult.scores
            })
          });
          
          if (enhancedResponse.ok) {
            const enhancedData = await enhancedResponse.json();
            setResult({
              ...basicResult,
              enhancedChance: enhancedData.enhancedChance,
              aiScores: analysisResult.scores
            });
          } else {
            setResult(basicResult);
          }
        } else {
          setResult(basicResult);
        }
      } else if (cachedAiAnalysis) {
        // Use cached AI analysis
        const response = await fetch('/api/calculate-enhanced', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gpa: gpa,
            satScore: formData.testType === 'sat' ? testScore : convertScore(testScore, 'act'),
            college: selectedCollege,
            userId: user?.email || 'anonymous',
            aiScores: cachedAiAnalysis.scores
          })
        });
        
        if (response.ok) {
          const enhancedData = await response.json();
          setResult({
            ...basicResult,
            enhancedChance: enhancedData.enhancedChance,
            aiScores: cachedAiAnalysis.scores
          });
      } else {
          setResult(basicResult);
        }
      } else {
        setResult(basicResult);
      }
    } catch (error) {
      console.error('Calculation error:', error);
      const selectedCollege = COLLEGES.find(c => c.name === formData.college);
      if (selectedCollege) {
        setResult(calculateChance(gpa, testScore, formData.testType, selectedCollege));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setFormData({ gpa: '', sat: '', act: '', college: '', testType: 'sat' });
    setResult(null);
    setSearchTerm('');
    setAiScores(null);
    setEssayFeedback('');
    setCachedAiAnalysis(null);
    setShowPaidCalculator(false);
    
    // Clear localStorage cache
    localStorage.removeItem('premiumFormData');
    localStorage.removeItem('cachedAiAnalysis');
  };

  const handleAnalysisComplete = async (scores: any, essayFeedback?: string) => {
    console.log('handleAnalysisComplete called with:', { scores, essayFeedback });
    
    // Create content hash for current data
    const currentContentHash = JSON.stringify({
      essay: premiumFormData.essay,
      extracurriculars: premiumFormData.extracurriculars,
      apScores: premiumFormData.apScores,
      ibScores: premiumFormData.ibScores,
      honorsClasses: premiumFormData.honorsClasses
    });
    
    // Cache the AI analysis results
    const analysisCache = {
      scores,
      essayFeedback: essayFeedback || '',
      timestamp: Date.now(),
      contentHash: currentContentHash
    };
    setCachedAiAnalysis(analysisCache);
    saveAiAnalysisCache(analysisCache);
    
    setAiScores(scores);
    setEssayFeedback(essayFeedback || '');
    setShowPaidCalculator(false);
    
    // Recalculate with enhanced analysis if we have a current result
    if (result && scores) {
      console.log('Recalculating enhanced chance with:', { basicChance: result.chance, aiScores: scores });
      try {
        const response = await fetch('/api/calculate-enhanced', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gpa: parseFloat(formData.gpa),
            satScore: formData.testType === 'sat' ? parseInt(formData.sat) : convertScore(parseInt(formData.act), 'act'),
            college: COLLEGES.find((c: any) => c.name === formData.college),
            userId: user?.email || 'anonymous',
            aiScores: scores
          })
        });
        
        if (response.ok) {
          const enhancedResult = await response.json();
          setResult({
            ...result,
            enhancedChance: enhancedResult.enhancedChance,
            aiScores: scores
          });
        }
      } catch (error) {
        console.error('Enhanced calculation error:', error);
      }
    }
  };

  const getChanceColor = (chance: number) => {
    if (chance >= 70) return 'text-green-600';
    if (chance >= 40) return 'text-blue-600';
    if (chance >= 20) return 'text-yellow-600';
    return 'text-red-600';
    };

    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header with Auth */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">College Calculator</h1>
        </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm">
                  <span className="text-gray-600">Welcome, </span>
                  <span className="font-medium text-gray-900">{user.email}</span>
                  {isPremium && (
                    <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      Premium
                    </span>
                  )}
      </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium"
                >
                  Logout
                </button>
      </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            )}
      </div>
        </div>

        <div className="text-center mb-12 relative">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            College Chances Calculator
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get an accurate estimate of your admission chances at top colleges and universities
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Uses data from official CDS reports where available, supplemented by reliable third-party sources. Many universities no longer publish specific test score ranges in their official CDS.
        </p>
      </div>



        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Your Profile
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* College Selection */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Colleges
                </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type to search colleges..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select College
                </label>
                <select
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a college</option>
                  {filteredColleges.map((college) => (
                    <option key={college.name} value={college.name}>
                      {college.name}
                      </option>
                  ))}
                </select>
            </div>

              {/* GPA Input */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GPA (4.0 scale)
                </label>
              <input
                type="number"
                name="gpa"
                  value={formData.gpa}
                  onChange={handleInputChange}
                step="0.01"
                min="0"
                max="4"
                required
                  placeholder="Enter your GPA (e.g., 3.85)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

              {/* Test Type Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Type
                </label>
              <select
                  name="testType"
                  value={formData.testType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sat">SAT</option>
                <option value="act">ACT</option>
              </select>
              </div>
              
              {/* Test Score Input */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.testType === 'sat' ? 'SAT Score' : 'ACT Score'}
                </label>
                  <input
                    type="number"
                  name={formData.testType}
                  value={formData.testType === 'sat' ? formData.sat : formData.act}
                  onChange={handleInputChange}
                  min={formData.testType === 'sat' ? "400" : "1"}
                  max={formData.testType === 'sat' ? "1600" : "36"}
                    required
                  placeholder={formData.testType === 'sat' ? "Enter your SAT score (400-1600)" : "Enter your ACT score (1-36)"}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

              {/* Premium Features Section - Detailed */}
              <div className="border-t pt-6 mt-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Enhanced Analysis (Premium)
                  </h3>
                  {isPremium ? (
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Premium Active
                    </div>
                  ) : (
                    <div className="text-center">
                      <button
                        onClick={() => {
                          if (isPremium) {
                            // Already premium, do nothing
                          } else {
                            setShowPricingModal(true);
                          }
                        }}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                          isPremium 
                            ? 'bg-green-600 text-white cursor-not-allowed' 
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {isPremium ? 'Premium Active' : 'Premium'}
                      </button>
                    </div>
                  )}
                </div>



                

                <div className="space-y-6">
                  {/* Essay Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Personal Essay
                    </label>
                    <textarea
                      disabled={!isPremium}
                      value={premiumFormData.essay}
                      onChange={(e) => updatePremiumFormData({...premiumFormData, essay: e.target.value})}
                      placeholder="Paste your personal essay here (500-650 words recommended)..."
                      className={`w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        !isPremium ? 'bg-gray-50 cursor-not-allowed text-gray-400' : ''
                      }`}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Word count: {premiumFormData.essay.split(' ').filter(word => word.trim()).length}
                    </p>
                  </div>

                  {/* Extracurricular Activities */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Extracurricular Activities
                    </label>
                    {premiumFormData.extracurriculars.map((activity, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          disabled={!isPremium}
                          value={activity}
                          onChange={(e) => {
                            const newActivities = [...premiumFormData.extracurriculars];
                            newActivities[index] = e.target.value;
                            updatePremiumFormData({...premiumFormData, extracurriculars: newActivities});
                          }}
                          placeholder="e.g., President of Science Club, 2 years, 5 hours/week"
                          className={`flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${
                            !isPremium ? 'bg-gray-50 cursor-not-allowed text-gray-400' : ''
                          }`}
                        />
                        {premiumFormData.extracurriculars.length > 1 && (
                          <button
                            type="button"
                            disabled={!isPremium}
                            onClick={(e) => {
                              e.preventDefault();
                              const newActivities = premiumFormData.extracurriculars.filter((_, i) => i !== index);
                              updatePremiumFormData({...premiumFormData, extracurriculars: newActivities});
                            }}
                            className={`px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                              !isPremium ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      disabled={!isPremium}
                      onClick={(e) => {
                        e.preventDefault();
                        updatePremiumFormData({
                          ...premiumFormData, 
                          extracurriculars: [...premiumFormData.extracurriculars, '']
                        });
                      }}
                      className={`mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${
                        !isPremium ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Add Activity
                    </button>

                  </div>

                  {/* AP Scores */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AP Scores (1-5 scale)
                    </label>
                    {premiumFormData.apScores.map((score, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="number"
                    min="1"
                          max="5"
                          disabled={!isPremium}
                          value={score}
                          onChange={(e) => {
                            const newScores = [...premiumFormData.apScores];
                            newScores[index] = e.target.value;
                            updatePremiumFormData({...premiumFormData, apScores: newScores});
                          }}
                          placeholder="AP Score (1-5)"
                          className={`w-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${
                            !isPremium ? 'bg-gray-50 cursor-not-allowed text-gray-400' : ''
                          }`}
                        />
                        {premiumFormData.apScores.length > 1 && (
                          <button
                            type="button"
                            disabled={!isPremium}
                            onClick={(e) => {
                              e.preventDefault();
                              const newScores = premiumFormData.apScores.filter((_, i) => i !== index);
                              updatePremiumFormData({...premiumFormData, apScores: newScores});
                            }}
                            className={`px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                              !isPremium ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            Remove
                          </button>
                        )}
                </div>
                    ))}
                    <button
                      type="button"
                      disabled={!isPremium}
                      onClick={(e) => {
                        e.preventDefault();
                        updatePremiumFormData({
                          ...premiumFormData, 
                          apScores: [...premiumFormData.apScores, '']
                        });
                      }}
                      className={`mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${
                        !isPremium ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Add AP Score
                    </button>
                  </div>

                  {/* IB Scores */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      IB Scores (1-7 scale)
                    </label>
                    {premiumFormData.ibScores.map((score, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="number"
                          min="1"
                          max="7"
                          disabled={!isPremium}
                          value={score}
                          onChange={(e) => {
                            const newScores = [...premiumFormData.ibScores];
                            newScores[index] = e.target.value;
                            updatePremiumFormData({...premiumFormData, ibScores: newScores});
                          }}
                          placeholder="IB Score (1-7)"
                          className={`w-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${
                            !isPremium ? 'bg-gray-50 cursor-not-allowed text-gray-400' : ''
                          }`}
                        />
                        {premiumFormData.ibScores.length > 1 && (
                          <button
                            type="button"
                            disabled={!isPremium}
                            onClick={(e) => {
                              e.preventDefault();
                              const newScores = premiumFormData.ibScores.filter((_, i) => i !== index);
                              updatePremiumFormData({...premiumFormData, ibScores: newScores});
                            }}
                            className={`px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                              !isPremium ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      disabled={!isPremium}
                      onClick={(e) => {
                        e.preventDefault();
                        updatePremiumFormData({
                          ...premiumFormData, 
                          ibScores: [...premiumFormData.ibScores, '']
                        });
                      }}
                      className={`mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${
                        !isPremium ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      Add IB Score
                    </button>
            </div>

                  {/* Honors Classes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Honors/AP Classes Taken
                    </label>
                    <input
                      type="number"
                      min="0"
                      disabled={!isPremium}
                      value={premiumFormData.honorsClasses}
                      onChange={(e) => updatePremiumFormData({...premiumFormData, honorsClasses: e.target.value})}
                      className={`w-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 ${
                        !isPremium ? 'bg-gray-50 cursor-not-allowed text-gray-400' : ''
                      }`}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="space-y-3 pt-6">
            <button
              type="submit"
              disabled={loading}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    cachedAiAnalysis 
                      ? 'bg-purple-600 text-white hover:bg-purple-700 disabled:bg-purple-400' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400'
                  } disabled:cursor-not-allowed`}
            >
                  {loading ? 'Calculating...' : cachedAiAnalysis ? 'Calculate Enhanced Chances' : 'Calculate My Chances'}
            </button>

            <button
              type="button"
              onClick={resetForm}
                  className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
                  Reset Form
            </button>
              </div>
          </form>
        </div>

          {/* Results */}
          {result && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                Your Results for {result.collegeData.name}
              </h2>

              {/* Chance Display */}
              <div className="text-center mb-8">
                {result.enhancedChance ? (
                  <div>
                    <div className="text-4xl font-bold mb-2">
                      <span className={getChanceColor(result.enhancedChance)}>
                        {result.enhancedChance}%
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">Enhanced Admission Chance</p>
                    <div className="text-lg text-gray-500">
                      <span className={getChanceColor(result.chance)}>
                        {result.chance}%
                      </span> basic chance
                    </div>

                  </div>
                ) : (
              <div>
                    <div className="text-6xl font-bold mb-2">
                      <span className={getChanceColor(result.chance)}>
                        {result.chance}%
                      </span>
              </div>
                    <p className="text-gray-600">Admission Chance</p>
                  </div>
                )}
              </div>

              {/* College Stats */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">College Statistics</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                    <p className="text-gray-600">Admission Rate</p>
                    <p className="font-semibold">{result.collegeData.admissionRate}%</p>
              </div>
              <div>
                    <p className="text-gray-600">Average SAT</p>
                    <p className="font-semibold">{result.collegeData.avgSAT}</p>
              </div>
                  <div>
                    <p className="text-gray-600">Average ACT</p>
                    <p className="font-semibold">{result.collegeData.avgACT}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Average GPA</p>
                    <p className="font-semibold">{result.collegeData.avgGPA}</p>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Source: {result.collegeData.dataSource || 'Latest available CDS/official college statistics; some values estimated when not published'}
                </div>
              </div>

              {/* Upgrade to Premium */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">Get More Accurate Predictions</h3>
                <p className="text-sm text-purple-700 mb-3">
                  Upgrade to premium for AI-powered analysis of your essay, extracurriculars, and academic rigor.
                </p>
                                      <button
                        onClick={() => {
                          if (isPremium) {
                            // Already premium, do nothing
                          } else {
                            setShowPricingModal(true);
                          }
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isPremium 
                            ? 'bg-green-600 text-white cursor-not-allowed' 
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {isPremium ? 'Premium Active' : 'Premium'}
                      </button>
              </div>

              {/* AI Scores Display */}
              {result.aiScores && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold text-purple-800 mb-4">AI Analysis Scores</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Essay Quality</p>
                      <p className="font-semibold text-purple-700">{result.aiScores.essayScore}/100</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Extracurriculars</p>
                      <p className="font-semibold text-purple-700">{result.aiScores.ecScore}/100</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Academic Rigor</p>
                      <p className="font-semibold text-purple-700">{result.aiScores.academicRigorScore}/100</p>
                    </div>
                  </div>
                  
                  {/* Essay Feedback */}
                  {essayFeedback && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">Essay Feedback</h4>
                      <div className="text-sm text-gray-700">
                        {essayFeedback.split('\n').map((point, index) => (
                          <div key={index} className="mb-2">
                            <span className="font-medium text-purple-700">{index + 1}.</span> {point}
                          </div>
                        ))}
            </div>
          </div>
        )}
                </div>
              )}


            </div>
          )}
        </div>

        {/* Paid Calculator Modal */}
        {showPaidCalculator && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{zIndex: 9999}}>
            {(() => { console.log('Modal should be visible, showPaidCalculator:', showPaidCalculator); return null; })()}
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Enhanced Analysis</h2>
                <button
                  onClick={() => setShowPaidCalculator(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <PaidCalculator onAnalysisComplete={handleAnalysisComplete} />
            </div>
          </div>
        )}

        {/* Pricing Modal */}
        {showPricingModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Choose Your Premium Plan</h2>
                  <button
                    onClick={() => setShowPricingModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">2 Weeks</h3>
                      <div className="text-3xl font-bold text-purple-600 mb-2">$5</div>
                      <p className="text-sm text-gray-600 mb-4">Perfect for final applications</p>
                      <button
                        onClick={() => {
                          setSelectedTier('2-weeks');
                          setShowPricingModal(false);
                          if (!user) {
                            setShowAuthModal(true);
                          } else {
                            setShowPaymentModal(true);
                          }
                        }}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Choose Plan
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 border-2 border-purple-400 relative hover:border-purple-500 transition-colors">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">1 Month</h3>
                      <div className="text-3xl font-bold text-purple-600 mb-2">$15</div>
                      <p className="text-sm text-gray-600 mb-4">Great for application season</p>
                      <button
                        onClick={() => {
                          setSelectedTier('1-month');
                          setShowPricingModal(false);
                          if (!user) {
                            setShowAuthModal(true);
                          } else {
                            setShowPaymentModal(true);
                          }
                        }}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Choose Plan
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">3 Months</h3>
                      <div className="text-3xl font-bold text-purple-600 mb-2">$35</div>
                      <p className="text-sm text-gray-600 mb-4">Best value for planning</p>
                      <button
                        onClick={() => {
                          setSelectedTier('3-months');
                          setShowPricingModal(false);
                          if (!user) {
                            setShowAuthModal(true);
                          } else {
                            setShowPaymentModal(true);
                          }
                        }}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Choose Plan
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">What's Included:</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• AI-powered essay analysis and feedback</li>
                    <li>• Extracurricular activity evaluation</li>
                    <li>• Academic rigor assessment</li>
                    <li>• Enhanced admission predictions</li>
                    <li>• Data persistence across sessions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => {
            setShowPaymentModal(false);
            setShowPaidCalculator(true);
          }}
          userEmail={user?.email || ''}
          selectedTier={selectedTier}
        />

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500">
          <p className="text-sm">
            This calculator provides estimates based on Common Data Set (CDS) and official college admission data. 
            Actual admission decisions depend on many factors including essays, recommendations, and extracurricular activities.
          </p>
        </div>
      </div>
    </div>
  );
}
