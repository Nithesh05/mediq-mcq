import { Question } from "./mcqs";

export const expandedMCQs: Question[] = [
    // --- YEAR 1: ANATOMY, PHYSIOLOGY, BIOCHEMISTRY ---
    {
        id: 1001,
        question: "Which nerve passes through the carpal tunnel?",
        options: ["Ulnar nerve", "Median nerve", "Radial nerve", "Musculocutaneous nerve"],
        correctAnswer: 1,
        explanation: "The Median nerve passes through the carpal tunnel and is compressed in Carpal Tunnel Syndrome.",
        difficulty: "Easy",
        subject: "Anatomy",
        year: "Year 1",
        tags: ["Upper Limb", "Nerves"]
    },
    {
        id: 1002,
        question: "The 'Powerhouse of the cell' is:",
        options: ["Nucleus", "Golgi apparatus", "Mitochondria", "Ribosome"],
        correctAnswer: 2,
        explanation: "Mitochondria generate most of the cell's supply of adenosine triphosphate (ATP).",
        difficulty: "Easy",
        subject: "Physiology",
        year: "Year 1",
        tags: ["Cell Biology"]
    },
    {
        id: 1003,
        question: "Which enzyme is deficient in Phenylketonuria (PKU)?",
        options: ["Tyrosine hydroxylase", "Phenylalanine hydroxylase", "Dopa decarboxylase", "Homogentisate oxidase"],
        correctAnswer: 1,
        explanation: "Phenylalanine hydroxylase deficiency leads to accumulation of phenylalanine.",
        difficulty: "Medium",
        subject: "Biochemistry",
        year: "Year 1",
        tags: ["Metabolism", "Genetics"]
    },
    {
        id: 1004,
        question: "The rotator cuff muscles include all EXCEPT:",
        options: ["Supraspinatus", "Infraspinatus", "Teres Major", "Subscapularis"],
        correctAnswer: 2,
        explanation: "The rotator cuff muscles are Supraspinatus, Infraspinatus, Teres Minor, and Subscapularis (SITS). Teres Major is NOT part of it.",
        difficulty: "Medium",
        subject: "Anatomy",
        year: "Year 1",
        tags: ["Upper Limb", "Muscles"]
    },
    {
        id: 1005,
        question: "Surfactant is produced by:",
        options: ["Type I Pneumocytes", "Type II Pneumocytes", "Clara cells", "Macrophages"],
        correctAnswer: 1,
        explanation: "Type II Pneumocytes secrete surfactant, which reduces surface tension in alveoli.",
        difficulty: "Medium",
        subject: "Physiology",
        year: "Year 1",
        tags: ["Respiratory"]
    },
    {
        id: 1006,
        question: "Which vitamin deficiency causes Scurvy?",
        options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
        correctAnswer: 2,
        explanation: "Vitamin C (Ascorbic acid) deficiency leads to defective collagen synthesis and Scurvy.",
        difficulty: "Easy",
        subject: "Biochemistry",
        year: "Year 1",
        tags: ["Vitamins"]
    },
    {
        id: 1007,
        question: "The pacemaker of the heart is:",
        options: ["AV Node", "SA Node", "Bundle of His", "Purkinje Fibers"],
        correctAnswer: 1,
        explanation: "The Sinoatrial (SA) Node is the natural pacemaker of the heart.",
        difficulty: "Easy",
        subject: "Physiology",
        year: "Year 1",
        tags: ["Cardiology"]
    },
    {
        id: 1008,
        question: "Which artery is the main blood supply to the head of the femur?",
        options: ["Obturator artery", "Medial circumflex femoral artery", "Lateral circumflex femoral artery", "Superior gluteal artery"],
        correctAnswer: 1,
        explanation: "The Medial circumflex femoral artery is the primary blood supply; its damage causes avascular necrosis.",
        difficulty: "Hard",
        subject: "Anatomy",
        year: "Year 1",
        tags: ["Lower Limb", "Vascular"]
    },
    {
        id: 1009,
        question: "In competitive inhibition, Km is:",
        options: ["Increased", "Decreased", "Unchanged", "Zero"],
        correctAnswer: 0,
        explanation: "In competitive inhibition, Km increases (affinity decreases) while Vmax remains unchanged.",
        difficulty: "Hard",
        subject: "Biochemistry",
        year: "Year 1",
        tags: ["Enzymes"]
    },
    {
        id: 1010,
        question: "The diaphragm is innervated by:",
        options: ["Vagus nerve", "Phrenic nerve", "Intercostal nerves", "Accessory nerve"],
        correctAnswer: 1,
        explanation: "The Phrenic nerve (C3, C4, C5) innervates the diaphragm.",
        difficulty: "Easy",
        subject: "Anatomy",
        year: "Year 1",
        tags: ["Thorax", "Nerves"]
    },

    // --- YEAR 2: PATHOLOGY, MICROBIOLOGY, PHARMACOLOGY ---
    {
        id: 2001,
        question: "Which of the following is an example of Granulomatous inflammation?",
        options: ["Acute Appendicitis", "Tuberculosis", "Lobar Pneumonia", "Cellulitis"],
        correctAnswer: 1,
        explanation: "Tuberculosis is the classic prototype of granulomatous inflammation (Caseating granulomas).",
        difficulty: "Easy",
        subject: "Pathology",
        year: "Year 2",
        tags: ["Inflammation"]
    },
    {
        id: 2002,
        question: "The drug of choice for Anaphylactic shock is:",
        options: ["Hydrocortisone", "Adrenaline (Epinephrine)", "Chlorpheniramine", "Dopamine"],
        correctAnswer: 1,
        explanation: "Adrenaline (IM) is the life-saving drug of choice for anaphylaxis.",
        difficulty: "Easy",
        subject: "Pharmacology",
        year: "Year 2",
        tags: ["Emergency"]
    },
    {
        id: 2003,
        question: "Rice-water stool is characteristic of:",
        options: ["Typhoid", "Cholera", "Dysentery", "Giardiasis"],
        correctAnswer: 1,
        explanation: "Vibrio cholerae infection causes massive watery diarrhea described as 'rice-water stool'.",
        difficulty: "Easy",
        subject: "Microbiology",
        year: "Year 2",
        tags: ["Infectious Disease"]
    },
    {
        id: 2004,
        question: "Which of the following is a reversible cell injury change?",
        options: ["Karyorrhexis", "Pyknosis", "Hydropic degeneration", "Karyolysis"],
        correctAnswer: 2,
        explanation: "Hydropic degeneration (cellular swelling) is a reversible change. Nuclear changes (Pyknosis, Karyorrhexis, Karyolysis) indicate necrosis (irreversible).",
        difficulty: "Medium",
        subject: "Pathology",
        year: "Year 2",
        tags: ["Cell Injury"]
    },
    {
        id: 2005,
        question: "Mechanism of action of Aspirin:",
        options: ["Reversible COX inhibition", "Irreversible COX inhibition", "Phospholipase A2 inhibition", "Lipoxygenase inhibition"],
        correctAnswer: 1,
        explanation: "Aspirin irreversibly inhibits Cyclooxygenase (COX) enzymes.",
        difficulty: "Medium",
        subject: "Pharmacology",
        year: "Year 2",
        tags: ["Analgesics"]
    },
    {
        id: 2006,
        question: "Negri bodies are seen in:",
        options: ["Herpes Simplex", "Rabies", "Smallpox", "Measles"],
        correctAnswer: 1,
        explanation: "Negri bodies are intracytoplasmic inclusion bodies pathognomonic for Rabies.",
        difficulty: "Medium",
        subject: "Microbiology",
        year: "Year 2",
        tags: ["Virology"]
    },
    {
        id: 2007,
        question: "Which anticancer drug causes cardiomyopathy?",
        options: ["Cyclophosphamide", "Methotrexate", "Doxorubicin", "Vincristine"],
        correctAnswer: 2,
        explanation: "Doxorubicin (Adriamycin) is known for causing cardiotoxicity (dilated cardiomyopathy).",
        difficulty: "Hard",
        subject: "Pharmacology",
        year: "Year 2",
        tags: ["Oncology"]
    },
    {
        id: 2008,
        question: "Reed-Sternberg cells are characteristic of:",
        options: ["Non-Hodgkin Lymphoma", "Hodgkin Lymphoma", "Multiple Myeloma", "Burkitt Lymphoma"],
        correctAnswer: 1,
        explanation: "Reed-Sternberg cells ('Owl-eye' appearance) are the hallmark of Hodgkin Lymphoma.",
        difficulty: "Medium",
        subject: "Pathology",
        year: "Year 2",
        tags: ["Hematology"]
    },
    {
        id: 2009,
        question: "Which bacteria causes Gas Gangrene?",
        options: ["Clostridium tetani", "Clostridium perfringens", "Bacillus anthracis", "Staphylococcus aureus"],
        correctAnswer: 1,
        explanation: "Clostridium perfringens is the most common cause of Gas Gangrene (Myonecrosis).",
        difficulty: "Medium",
        subject: "Microbiology",
        year: "Year 2",
        tags: ["Bacteriology"]
    },
    {
        id: 2010,
        question: "Antidote for Paracetamol poisoning is:",
        options: ["Atropine", "N-acetylcysteine", "Flumazenil", "Naloxone"],
        correctAnswer: 1,
        explanation: "N-acetylcysteine replenishes glutathione and is the specific antidote for Acetaminophen toxicity.",
        difficulty: "Easy",
        subject: "Pharmacology",
        year: "Year 2",
        tags: ["Toxicology"]
    },

    // --- YEAR 3: ENT, OPHTHALMOLOGY, PSM ---
    {
        id: 3001,
        question: "Bitot's spots are a sign of:",
        options: ["Vitamin A deficiency", "Vitamin D deficiency", "Vitamin C deficiency", "Vitamin B12 deficiency"],
        correctAnswer: 0,
        explanation: "Bitot's spots (foamy white spots on conjunctiva) are a sign of Vitamin A deficiency (Xerophthalmia).",
        difficulty: "Easy",
        subject: "Ophthalmology",
        year: "Year 3",
        tags: ["Nutrition"]
    },
    {
        id: 3002,
        question: "Little's area is the most common site for:",
        options: ["Nasal polyps", "Epistaxis", "Sinusitis", "Foreign body"],
        correctAnswer: 1,
        explanation: "Little's area (Kiesselbach's plexus) on the nasal septum is the most common site for nosebleeds (Epistaxis).",
        difficulty: "Easy",
        subject: "ENT",
        year: "Year 3",
        tags: ["Nose"]
    },
    {
        id: 3003,
        question: "The denominator in Maternal Mortality Ratio (MMR) is:",
        options: ["Total population", "Total live births", "Total women of reproductive age", "Total pregnancies"],
        correctAnswer: 1,
        explanation: "MMR is calculated per 100,000 Live Births.",
        difficulty: "Medium",
        subject: "PSM",
        year: "Year 3",
        tags: ["Demography"]
    },
    {
        id: 3004,
        question: "Cherry Red Spot at the macula is seen in:",
        options: ["Diabetic Retinopathy", "Central Retinal Artery Occlusion (CRAO)", "Central Retinal Vein Occlusion (CRVO)", "Retinal Detachment"],
        correctAnswer: 1,
        explanation: "A Cherry Red Spot is classic for CRAO (and also Tay-Sachs disease).",
        difficulty: "Medium",
        subject: "Ophthalmology",
        year: "Year 3",
        tags: ["Retina"]
    },
    {
        id: 3005,
        question: "Which hearing test compares Air Conduction (AC) and Bone Conduction (BC)?",
        options: ["Weber's test", "Rinne's test", "ABC test", "Schwabach's test"],
        correctAnswer: 1,
        explanation: "Rinne's test compares AC and BC. Positive Rinne (AC > BC) is normal.",
        difficulty: "Medium",
        subject: "ENT",
        year: "Year 3",
        tags: ["Audiology"]
    },
    {
        id: 3006,
        question: "Incidence refers to:",
        options: ["New cases only", "Old cases only", "New and Old cases", "Deaths"],
        correctAnswer: 0,
        explanation: "Incidence is the number of NEW cases occurring in a population during a specified time.",
        difficulty: "Easy",
        subject: "PSM",
        year: "Year 3",
        tags: ["Epidemiology"]
    },
    {
        id: 3007,
        question: "Most common cause of blindness in India is:",
        options: ["Glaucoma", "Cataract", "Refractive errors", "Diabetic Retinopathy"],
        correctAnswer: 1,
        explanation: "Cataract is the leading cause of blindness in India.",
        difficulty: "Easy",
        subject: "Ophthalmology",
        year: "Year 3",
        tags: ["Public Health"]
    },
    {
        id: 3008,
        question: "Quinsy is also known as:",
        options: ["Acute Tonsillitis", "Peritonsillar Abscess", "Retropharyngeal Abscess", "Ludwig's Angina"],
        correctAnswer: 1,
        explanation: "Quinsy is a Peritonsillar Abscess, a complication of tonsillitis.",
        difficulty: "Medium",
        subject: "ENT",
        year: "Year 3",
        tags: ["Throat"]
    },
    {
        id: 3009,
        question: "Janani Suraksha Yojana (JSY) aims to reduce:",
        options: ["Malaria", "Tuberculosis", "Maternal and Neonatal Mortality", "HIV/AIDS"],
        correctAnswer: 2,
        explanation: "JSY promotes institutional deliveries to reduce Maternal and Neonatal Mortality.",
        difficulty: "Easy",
        subject: "PSM",
        year: "Year 3",
        tags: ["Health Programs"]
    },
    {
        id: 3010,
        question: "Glaucoma is characterized by:",
        options: ["Increased IOP, Optic disc cupping, Visual field defects", "Cataract, Retinopathy", "Red eye, discharge", "Night blindness"],
        correctAnswer: 0,
        explanation: "The triad of Glaucoma includes raised Intraocular Pressure (IOP), Optic disc changes (cupping), and Visual field defects.",
        difficulty: "Medium",
        subject: "Ophthalmology",
        year: "Year 3",
        tags: ["Glaucoma"]
    },

    // --- YEAR 4: MEDICINE, SURGERY, OBGYN, PEDIATRICS ---
    {
        id: 4001,
        question: "Beck's Triad for Cardiac Tamponade includes all EXCEPT:",
        options: ["Hypotension", "Muffled heart sounds", "Distended neck veins", "Bradycardia"],
        correctAnswer: 3,
        explanation: "Beck's Triad consists of Hypotension, Muffled heart sounds, and Distended neck veins (JVP). Bradycardia is not part of it.",
        difficulty: "Hard",
        subject: "Surgery",
        year: "Year 4",
        tags: ["Cardiology", "Emergency"]
    },
    {
        id: 4002,
        question: "Most common cause of Neonatal Jaundice in the first 24 hours:",
        options: ["Physiological jaundice", "Breast milk jaundice", "Hemolytic disease (Rh/ABO incompatibility)", "Biliary atresia"],
        correctAnswer: 2,
        explanation: "Jaundice appearing within the first 24 hours is always pathological, most commonly due to hemolysis.",
        difficulty: "Medium",
        subject: "Pediatrics",
        year: "Year 4",
        tags: ["Neonatology"]
    },
    {
        id: 4003,
        question: "Which sign is seen in Tetany?",
        options: ["Kernig's sign", "Brudzinski's sign", "Chvostek's sign", "Murphy's sign"],
        correctAnswer: 2,
        explanation: "Chvostek's sign (facial twitching on tapping the facial nerve) is a sign of Hypocalcemia/Tetany.",
        difficulty: "Medium",
        subject: "Medicine",
        year: "Year 4",
        tags: ["Endocrinology"]
    },
    {
        id: 4004,
        question: "The most common site of Ectopic Pregnancy is:",
        options: ["Ovary", "Cervix", "Fallopian Tube (Ampulla)", "Abdomen"],
        correctAnswer: 2,
        explanation: "The Ampulla of the Fallopian tube is the most common site (>90%) for ectopic pregnancy.",
        difficulty: "Easy",
        subject: "OBGYN",
        year: "Year 4",
        tags: ["Obstetrics"]
    },
    {
        id: 4005,
        question: "Charcot's Triad for Ascending Cholangitis includes:",
        options: ["Fever, Jaundice, RUQ Pain", "Fever, Headache, Vomiting", "Pain, Pallor, Pulselessness", "Hematuria, Mass, Pain"],
        correctAnswer: 0,
        explanation: "Charcot's Triad involves Fever, Jaundice, and Right Upper Quadrant (RUQ) Pain.",
        difficulty: "Medium",
        subject: "Surgery",
        year: "Year 4",
        tags: ["Hepatobiliary"]
    },
    {
        id: 4006,
        question: "Drug of choice for Eclampsia is:",
        options: ["Diazepam", "Phenytoin", "Magnesium Sulfate", "Labetalol"],
        correctAnswer: 2,
        explanation: "Magnesium Sulfate is the drug of choice for controlling and preventing seizures in Eclampsia.",
        difficulty: "Easy",
        subject: "OBGYN",
        year: "Year 4",
        tags: ["Obstetrics"]
    },
    {
        id: 4007,
        question: "Tetralogy of Fallot (TOF) includes all EXCEPT:",
        options: ["VSD", "Pulmonary Stenosis", "Right Ventricular Hypertrophy", "ASD"],
        correctAnswer: 3,
        explanation: "TOF includes VSD, Pulmonary Stenosis, RVH, and Overriding Aorta. ASD is not part of the classic tetralogy.",
        difficulty: "Hard",
        subject: "Pediatrics",
        year: "Year 4",
        tags: ["Cardiology"]
    },
    {
        id: 4008,
        question: "H. pylori infection is most strongly associated with:",
        options: ["Duodenal Ulcer", "Gastric Ulcer", "GERD", "Esophageal Varices"],
        correctAnswer: 0,
        explanation: "H. pylori is present in >90% of Duodenal Ulcer cases.",
        difficulty: "Medium",
        subject: "Medicine",
        year: "Year 4",
        tags: ["Gastroenterology"]
    },
    {
        id: 4009,
        question: "Which of the following is a sign of Breast Cancer?",
        options: ["Mobile lump", "Painful lump", "Peau d'orange", "Cyclical mastalgia"],
        correctAnswer: 2,
        explanation: "Peau d'orange (orange peel appearance) is a sign of advanced breast cancer due to lymphatic edema.",
        difficulty: "Easy",
        subject: "Surgery",
        year: "Year 4",
        tags: ["Oncology"]
    },
    {
        id: 4010,
        question: "Normal fetal heart rate is:",
        options: ["60-100 bpm", "110-160 bpm", "80-120 bpm", "140-180 bpm"],
        correctAnswer: 1,
        explanation: "The normal baseline fetal heart rate is between 110 and 160 beats per minute.",
        difficulty: "Easy",
        subject: "OBGYN",
        year: "Year 4",
        tags: ["Obstetrics"]
    }
];
