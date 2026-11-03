# 🏥 MediCare

**A holistic healthcare platform that brings real-time monitoring, affordable medication access, and mental health support into one app.**

---

## 📖 Overview

Millions of people with chronic conditions like hypertension and diabetes manage their health alone, with no continuous monitoring, unreliable medication habits, and little mental health support. By the time symptoms show up, it is often an emergency.

**MediCare** closes that gap. It connects wearables and home devices to an AI-driven platform that tracks vitals, predicts risks before they escalate, helps users stay on their medication, and supports their emotional well-being.

### The Problem, Through One Story

Priya is a 52-year-old homemaker in a small town in India, living with hypertension and diabetes. The nearest clinic is far away and her days are full, so regular check-ups never happen. One evening she collapses from a spike in blood pressure and blood sugar. Afterwards she struggles with expensive medication, missed doses, and no way to track her progress, and she feels isolated with nowhere to turn for mental health support.

Priya's story is not unique. She needs real-time monitoring, affordable medicines, and mental health support in one place.

---

## 🚨 The Healthcare Gaps

| Gap | Impact |
|---|---|
| **No continuous monitoring** | About 46.1% of adults aged 45+ in India have at least one diagnosed chronic condition |
| **Late detection** | Anomalies are caught late, so they escalate into emergencies |
| **Fragmented health data** | Less than 15% of Indian healthcare providers use FHIR-based APIs for real-time data exchange (as of 2023) |
| **Declining physical health** | Over 1.4 billion adults are overweight, contributing to 2.8 million deaths a year from obesity-related diseases (WHO, 2021) |
| **Mental health** | Mental disorders affect 1 in 4 people each year (WHO), and access to support is limited |
| **Medication adherence and access** | About 50% of patients don't adhere to prescribed medication, and affordable access remains a challenge (WHO) |

---

## ✨ Key Features

- 📡 **Wearable and home device integration**: heart rate, blood pressure, and oxygen levels
- ⚡ **Real-time monitoring**: instant alerts, medicine reminders, and anomaly detection
- 🧠 **AI-powered predictive analytics**: identify risks before they escalate
- 🆘 **One-tap SOS**: emergency alerts with live location sent to contacts and hospitals
- 🛡️ **Government scheme integration**: PMJAY and Ayushman Bharat eligibility checks and access to subsidized care
- 💊 **Medicine ordering**: order prescribed medications directly through the platform
- 🏃 **Fitness tracking**: calories, BMI, water intake, and activity, with personalized health plans
- 🌱 **Mental health support**: stress, anxiety, and emotional well-being tracking and guidance
- 🩺 **Telehealth**: secure, scalable remote consultations for underserved areas
- 🔐 **Blockchain-based security**: tamper-proof EHR storage

---

## 🏗️ Architecture

The project includes the following design artifacts:

- **Architecture Diagram**: overall system design
- **Sequence Diagram**: interaction flow between users, devices, and services
- **Entity-Relationship (ER) Diagram**: database schema

> 📁 Diagrams are available in the project presentation (`medicare.pptx`).

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Mobile app** | React Native |
| **Web app** | React.js |
| **Styling** | Tailwind CSS |
| **Cloud** | AWS / GCP / Azure |
| **AI / ML** | Python (Pandas, Scikit-learn), TensorFlow Lite (on-device alerts) |
| **Interoperability** | FHIR standard for EHR integration |
| **Security** | End-to-end encryption, HIPAA and GDPR compliance |
| **Hosting** | Cloud-hosted web portal for patients, caregivers, and doctors |

---

## 🆚 How MediCare Compares

| Feature | MediCare | Practo | Tata 1mg | HealthifyMe |
|---|:---:|:---:|:---:|:---:|
| Real-time RPM with IoT | ✅ | ❌ | ❌ | ❌ |
| AI-powered predictive analytics | ✅ | Limited | Limited | Basic fitness AI |
| Govt scheme integration (PMJAY, AB) | ✅ | ❌ | ❌ | ❌ |
| SOS emergency button | ✅ | ❌ | ❌ | ❌ |
| Mental health support | ✅ | Limited | ❌ | Basic mindfulness |
| Blockchain-based security | ✅ | ❌ | ❌ | ❌ |
| Cross-platform (web + app) | ✅ | ✅ | ✅ | ✅ |
| Personalized diet and fitness plans | ✅ | ❌ | ❌ | ✅ |

---

## 📚 References

- [Chronic conditions prevalence in India (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10069025/)
- [WHO: Obesity and overweight](https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight)
- [WHO: World Health Report 2001, Mental disorders](https://www.who.int/news/item/28-09-2001-the-world-health-report-2001-mental-disorders-affect-one-in-four-people)
- [Ministry of Health & Family Welfare, India](https://tbcindia.mohfw.gov.in/wp-content/uploads/2023/06/5646719104TB_AR_2023_04-04-2023_LRP_final.pdf)

---

## 👥 Team

<!-- Add your team members here -->
- Name 1
- Name 2

## 📄 License

<!-- Add your license, e.g. MIT -->
This project is licensed under the [MIT License](LICENSE).

---

⭐ If you find this project useful, consider giving it a star!
