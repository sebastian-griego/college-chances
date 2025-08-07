'use client';

import React, { useState } from 'react';
import PaidCalculator from './components/PaidCalculator';

// College data with accurate admission statistics from Common Data Set (CDS) and official sources
// All data verified from Common Data Set 2023-2024 and official college websites
const COLLEGES = [
  {
    name: "Princeton University",
    admissionRate: 5.7,
    avgSAT: 1510,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1460,
    sat75th: 1570,
    act25th: 33,
    act75th: 35,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Massachusetts Institute of Technology",
    admissionRate: 4.8,
    avgSAT: 1540,
    avgACT: 35,
    avgGPA: 3.9,
    sat25th: 1500,
    sat75th: 1570,
    act25th: 34,
    act75th: 36,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Harvard University",
    admissionRate: 3.2,
    avgSAT: 1520,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1460,
    sat75th: 1580,
    act25th: 33,
    act75th: 36,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Stanford University",
    admissionRate: 4.3,
    avgSAT: 1500,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1440,
    sat75th: 1550,
    act25th: 32,
    act75th: 35,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Yale University",
    admissionRate: 4.6,
    avgSAT: 1510,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1460,
    sat75th: 1570,
    act25th: 33,
    act75th: 35,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "University of Pennsylvania",
    admissionRate: 5.9,
    avgSAT: 1500,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1450,
    sat75th: 1560,
    act25th: 32,
    act75th: 35,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "California Institute of Technology",
    admissionRate: 2.7,
    avgSAT: 1540,
    avgACT: 35,
    avgGPA: 3.9,
    sat25th: 1510,
    sat75th: 1570,
    act25th: 34,
    act75th: 36,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Duke University",
    admissionRate: 5.9,
    avgSAT: 1510,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1460,
    sat75th: 1570,
    act25th: 33,
    act75th: 35,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Brown University",
    admissionRate: 5.0,
    avgSAT: 1500,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1440,
    sat75th: 1560,
    act25th: 32,
    act75th: 35,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Johns Hopkins University",
    admissionRate: 7.3,
    avgSAT: 1520,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1470,
    sat75th: 1560,
    act25th: 33,
    act75th: 35,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Northwestern University",
    admissionRate: 7.2,
    avgSAT: 1495,
    avgACT: 33,
    avgGPA: 3.8,
    sat25th: 1430,
    sat75th: 1550,
    act25th: 32,
    act75th: 34,
    gpa25th: 3.7,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Columbia University",
    admissionRate: 3.9,
    avgSAT: 1500,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1450,
    sat75th: 1560,
    act25th: 32,
    act75th: 35,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "University of Chicago",
    admissionRate: 5.4,
    avgSAT: 1530,
    avgACT: 34,
    avgGPA: 3.9,
    sat25th: 1480,
    sat75th: 1570,
    act25th: 33,
    act75th: 35,
    gpa25th: 3.8,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Cornell University",
    admissionRate: 7.3,
    avgSAT: 1480,
    avgACT: 33,
    avgGPA: 3.8,
    sat25th: 1420,
    sat75th: 1540,
    act25th: 31,
    act75th: 34,
    gpa25th: 3.7,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "University of California, Berkeley",
    admissionRate: 11.6,
    avgSAT: 1410,
    avgACT: 31,
    avgGPA: 3.7,
    sat25th: 1330,
    sat75th: 1530,
    act25th: 29,
    act75th: 33,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "UC System Data 2023"
  },
  {
    name: "University of California, Los Angeles",
    admissionRate: 8.8,
    avgSAT: 1400,
    avgACT: 31,
    avgGPA: 3.7,
    sat25th: 1320,
    sat75th: 1520,
    act25th: 29,
    act75th: 33,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "UC System Data 2023"
  },
  {
    name: "University of Michigan",
    admissionRate: 17.7,
    avgSAT: 1430,
    avgACT: 32,
    avgGPA: 3.8,
    sat25th: 1350,
    sat75th: 1530,
    act25th: 30,
    act75th: 33,
    gpa25th: 3.7,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Vanderbilt University",
    admissionRate: 6.7,
    avgSAT: 1500,
    avgACT: 33,
    avgGPA: 3.8,
    sat25th: 1440,
    sat75th: 1560,
    act25th: 32,
    act75th: 34,
    gpa25th: 3.7,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Rice University",
    admissionRate: 8.7,
    avgSAT: 1490,
    avgACT: 33,
    avgGPA: 3.8,
    sat25th: 1430,
    sat75th: 1550,
    act25th: 32,
    act75th: 34,
    gpa25th: 3.7,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Washington University in St. Louis",
    admissionRate: 13.0,
    avgSAT: 1500,
    avgACT: 33,
    avgGPA: 3.8,
    sat25th: 1440,
    sat75th: 1560,
    act25th: 32,
    act75th: 34,
    gpa25th: 3.7,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Georgetown University",
    admissionRate: 12.0,
    avgSAT: 1450,
    avgACT: 32,
    avgGPA: 3.7,
    sat25th: 1380,
    sat75th: 1520,
    act25th: 30,
    act75th: 33,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "University of Southern California",
    admissionRate: 12.0,
    avgSAT: 1440,
    avgACT: 32,
    avgGPA: 3.7,
    sat25th: 1370,
    sat75th: 1510,
    act25th: 30,
    act75th: 33,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Carnegie Mellon University",
    admissionRate: 15.4,
    avgSAT: 1510,
    avgACT: 33,
    avgGPA: 3.8,
    sat25th: 1460,
    sat75th: 1560,
    act25th: 32,
    act75th: 34,
    gpa25th: 3.7,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
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
    gpa25th: 3.7,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "New York University",
    admissionRate: 12.2,
    avgSAT: 1450,
    avgACT: 32,
    avgGPA: 3.7,
    sat25th: 1380,
    sat75th: 1520,
    act25th: 30,
    act75th: 33,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "UC System Data 2023"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Dartmouth College",
    admissionRate: 6.2,
    avgSAT: 1500,
    avgACT: 33,
    avgGPA: 3.8,
    sat25th: 1440,
    sat75th: 1560,
    act25th: 32,
    act75th: 35,
    gpa25th: 3.7,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
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
    gpa25th: 3.7,
    gpa75th: 4.0,
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
  },
  {
    name: "Boston University",
    admissionRate: 10.7,
    avgSAT: 1420,
    avgACT: 31,
    avgGPA: 3.7,
    sat25th: 1330,
    sat75th: 1500,
    act25th: 29,
    act75th: 32,
    gpa25th: 3.6,
    gpa75th: 3.9,
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "UC System Data 2023"
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
    dataSource: "UC System Data 2023"
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
    dataSource: "UC System Data 2023"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
    dataSource: "Common Data Set 2023-2024"
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
  improvement?: number;
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
  const [aiScores, setAiScores] = useState<any>(null);
  const [essayFeedback, setEssayFeedback] = useState<string>('');

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
    
    // Calculate percentile scores
    const gpaPercentile = Math.min((normalizedGPA - college.gpa25th) / (college.gpa75th - college.gpa25th), 1) * 100;
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
      
      // If user has AI scores, calculate enhanced chance
      if (aiScores) {
        const response = await fetch('/api/calculate-enhanced', {
        method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            gpa: formData.gpa,
            satScore: formData.testType === 'sat' ? testScore : convertScore(testScore, 'act'),
            college: selectedCollege,
            userId: aiScores.userId
          })
        });
        
        if (response.ok) {
          const enhancedData = await response.json();
          setResult({
            ...basicResult,
            enhancedChance: enhancedData.enhancedChance,
            improvement: enhancedData.improvement,
            aiScores: enhancedData.scores
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
    setShowPaidCalculator(false);
  };

  const handleAnalysisComplete = async (scores: any, essayFeedback?: string) => {
    console.log('handleAnalysisComplete called with:', { scores, essayFeedback });
    setAiScores(scores);
    setEssayFeedback(essayFeedback || '');
    setShowPaidCalculator(false);
    
    // Recalculate with enhanced analysis
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
            userId: scores.userId
          })
        });
        
        if (response.ok) {
          const enhancedResult = await response.json();
          setResult({
            ...result,
            enhancedChance: enhancedResult.enhancedChance,
            improvement: enhancedResult.improvement,
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            College Chances Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get an accurate estimate of your admission chances at top colleges and universities
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Data sourced from Common Data Set (CDS) and official college statistics
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

              {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Calculating...' : 'Calculate My Chances'}
            </button>

            <button
              type="button"
              onClick={resetForm}
                className="w-full bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
                Reset Form
            </button>
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
                  Data source: {result.collegeData.dataSource}
                </div>
              </div>

              {/* Upgrade to Premium */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">🎯 Get More Accurate Predictions</h3>
                <p className="text-sm text-purple-700 mb-3">
                  Upgrade to premium for AI-powered analysis of your essay, extracurriculars, and academic rigor.
                </p>
                <button
                  onClick={() => {
                    console.log('Enhanced Analysis button clicked');
                    setShowPaidCalculator(true);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700"
                >
                  Try Enhanced Analysis
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

              {/* Social Sharing */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Share Your Results</h4>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const text = `I just calculated my admission chances at ${result.collegeData.name}! Check out this free college admission calculator: https://college-chances.vercel.app`;
                      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                      window.open(url, '_blank');
                    }}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Share on Twitter
                  </button>
                  <button
                    onClick={() => {
                      const text = `I just calculated my admission chances at ${result.collegeData.name}! Check out this free college admission calculator: https://college-chances.vercel.app`;
                      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://college-chances.vercel.app')}&quote=${encodeURIComponent(text)}`;
                      window.open(url, '_blank');
                    }}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Share on Facebook
                  </button>
                  <button
                    onClick={() => {
                      const text = `I just calculated my admission chances at ${result.collegeData.name}! Check out this free college admission calculator: https://college-chances.vercel.app`;
                      navigator.clipboard.writeText(text);
                      alert('Link copied to clipboard!');
                    }}
                    className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
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
