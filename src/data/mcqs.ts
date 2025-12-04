import { expandedMCQs } from "./mcq_bank_expanded";
import { year1Questions } from "./questions/year1";
import { year2Questions } from "./questions/year2";
import { year3Questions } from "./questions/year3";
import { year4Questions } from "./questions/year4";

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: Difficulty;
    subject: string;
    year: string;
    tags: string[];
}

export const mcqDatabase: Question[] = [
    ...expandedMCQs,
    ...year1Questions,
    ...year2Questions,
    ...year3Questions,
    ...year4Questions,
    // --- ANATOMY (Year 1) ---
    {
        id: 101,
        question: "Which of the following structures passes through the Foramen Ovale?",
        options: ["Maxillary nerve", "Mandibular nerve", "Middle meningeal artery", "Optic nerve"],
        correctAnswer: 1,
        explanation: "The Mandibular nerve (V3), a branch of the Trigeminal nerve, passes through the Foramen Ovale along with the Accessory meningeal artery, Lesser petrosal nerve, and Emissary vein (MALE).",
        difficulty: "Medium",
        subject: "Anatomy",
        year: "Year 1",
        tags: ["Head & Neck", "Competitve"]
    },
    {
        id: 102,
        question: "A patient presents with 'Winged Scapula'. Injury to which nerve is the most likely cause?",
        options: ["Axillary nerve", "Long thoracic nerve", "Suprascapular nerve", "Dorsal scapular nerve"],
        correctAnswer: 1,
        explanation: "The Long Thoracic Nerve supplies the Serratus Anterior muscle. Injury to this nerve leads to paralysis of the muscle, resulting in winging of the scapula.",
        difficulty: "Easy",
        subject: "Anatomy",
        year: "Year 1",
        tags: ["Upper Limb", "Clinical"]
    },
    {
        id: 103,
        question: "In the circle of Willis, the anterior communicating artery connects which two vessels?",
        options: ["Left and right internal carotid arteries", "Left and right anterior cerebral arteries", "Posterior cerebral and internal carotid arteries", "Basilar and vertebral arteries"],
        correctAnswer: 1,
        explanation: "The anterior communicating artery connects the left and right anterior cerebral arteries, completing the anterior part of the Circle of Willis.",
        difficulty: "Hard",
        subject: "Anatomy",
        year: "Year 1",
        tags: ["Neuroanatomy"]
    },
    {
        id: 104,
        question: "Which muscle is the primary flexor of the hip joint?",
        options: ["Gluteus maximus", "Iliopsoas", "Quadriceps femoris", "Hamstrings"],
        correctAnswer: 1,
        explanation: "The Iliopsoas muscle is the strongest and most important flexor of the hip joint.",
        difficulty: "Easy",
        subject: "Anatomy",
        year: "Year 1",
        tags: ["Lower Limb"]
    },
    {
        id: 105,
        question: "The 'Rotator Cuff' is formed by tendons of all the following muscles EXCEPT:",
        options: ["Supraspinatus", "Infraspinatus", "Teres minor", "Teres major"],
        correctAnswer: 3,
        explanation: "The Rotator Cuff is formed by SITS: Supraspinatus, Infraspinatus, Teres minor, and Subscapularis. Teres major is NOT part of the cuff.",
        difficulty: "Medium",
        subject: "Anatomy",
        year: "Year 1",
        tags: ["Upper Limb"]
    },

    // --- PHYSIOLOGY (Year 1) ---
    {
        id: 201,
        question: "Which phase of the cardiac cycle corresponds to the 'Isovolumetric Contraction'?",
        options: ["Opening of AV valves", "Closure of AV valves to opening of Semilunar valves", "Opening of Semilunar valves", "Closure of Semilunar valves to opening of AV valves"],
        correctAnswer: 1,
        explanation: "Isovolumetric contraction occurs after the closure of AV valves (S1) and before the opening of the Semilunar valves. Ventricular pressure rises without change in volume.",
        difficulty: "Medium",
        subject: "Physiology",
        year: "Year 1",
        tags: ["Cardiovascular", "Concepts"]
    },
    {
        id: 202,
        question: "Surfactant is produced by which type of cells in the alveoli?",
        options: ["Type I Pneumocytes", "Type II Pneumocytes", "Alveolar Macrophages", "Clara Cells"],
        correctAnswer: 1,
        explanation: "Type II Pneumocytes secrete surfactant (dipalmitoylphosphatidylcholine), which reduces surface tension and prevents alveolar collapse.",
        difficulty: "Easy",
        subject: "Physiology",
        year: "Year 1",
        tags: ["Respiratory"]
    },
    {
        id: 203,
        question: "Which of the following is the primary pacemaker of the heart?",
        options: ["AV Node", "Bundle of His", "SA Node", "Purkinje Fibers"],
        correctAnswer: 2,
        explanation: "The SA Node (Sinoatrial Node) has the highest intrinsic rate of depolarization, making it the primary pacemaker.",
        difficulty: "Easy",
        subject: "Physiology",
        year: "Year 1",
        tags: ["Cardiovascular"]
    },
    {
        id: 204,
        question: "Which hormone is primarily responsible for the 'Surge' that triggers ovulation?",
        options: ["FSH", "LH", "Estrogen", "Progesterone"],
        correctAnswer: 1,
        explanation: "The LH (Luteinizing Hormone) surge, triggered by high estrogen levels, is the direct cause of ovulation.",
        difficulty: "Medium",
        subject: "Physiology",
        year: "Year 1",
        tags: ["Endocrine"]
    },
    {
        id: 205,
        question: "What is the primary function of the Loop of Henle?",
        options: ["Glucose reabsorption", "Creation of corticomedullary osmotic gradient", "Acid-base balance", "Potassium secretion"],
        correctAnswer: 1,
        explanation: "The Loop of Henle creates a hyperosmotic medullary interstitium (countercurrent multiplier), which is essential for concentrating urine.",
        difficulty: "Hard",
        subject: "Physiology",
        year: "Year 1",
        tags: ["Renal"]
    },

    // --- PATHOLOGY (Year 2) ---
    {
        id: 301,
        question: "Which of the following is the hallmark feature of 'Irreversible Cell Injury'?",
        options: ["Cellular swelling", "Fatty change", "Amorphous densities in mitochondria", "Ribosomal detachment"],
        correctAnswer: 2,
        explanation: "The presence of large amorphous densities in mitochondria and severe membrane damage are key signs of irreversible cell injury (Necrosis).",
        difficulty: "Hard",
        subject: "Pathology",
        year: "Year 2",
        tags: ["General Pathology", "University Exam"]
    },
    {
        id: 302,
        question: "Reed-Sternberg cells are characteristic of which lymphoma?",
        options: ["Burkitt Lymphoma", "Follicular Lymphoma", "Hodgkin Lymphoma", "Diffuse Large B-Cell Lymphoma"],
        correctAnswer: 2,
        explanation: "Reed-Sternberg cells (owl-eye appearance) are the pathognomonic giant cells found in Hodgkin Lymphoma.",
        difficulty: "Easy",
        subject: "Pathology",
        year: "Year 2",
        tags: ["Hematology", "Clinical"]
    },
    {
        id: 303,
        question: "Which type of necrosis is most characteristic of Tuberculosis?",
        options: ["Coagulative necrosis", "Liquefactive necrosis", "Caseous necrosis", "Fibrinoid necrosis"],
        correctAnswer: 2,
        explanation: "Caseous necrosis ('cheese-like') is the hallmark of Tuberculosis granulomas.",
        difficulty: "Easy",
        subject: "Pathology",
        year: "Year 2",
        tags: ["General Pathology"]
    },
    {
        id: 304,
        question: "Which of the following markers is most specific for Acute Myocardial Infarction?",
        options: ["CK-MB", "Myoglobin", "Troponin I", "LDH"],
        correctAnswer: 2,
        explanation: "Cardiac Troponins (I and T) are the most specific and sensitive biomarkers for myocardial injury.",
        difficulty: "Medium",
        subject: "Pathology",
        year: "Year 2",
        tags: ["Cardiovascular"]
    },
    {
        id: 305,
        question: "The 'Starry Sky' appearance on histology is seen in:",
        options: ["Burkitt Lymphoma", "Hodgkin Lymphoma", "CLL", "Multiple Myeloma"],
        correctAnswer: 0,
        explanation: "Burkitt Lymphoma shows a 'Starry Sky' pattern due to tangible body macrophages ingesting apoptotic tumor cells.",
        difficulty: "Hard",
        subject: "Pathology",
        year: "Year 2",
        tags: ["Hematology"]
    },

    // --- PHARMACOLOGY (Year 2) ---
    {
        id: 401,
        question: "Which antidote is used for Paracetamol (Acetaminophen) poisoning?",
        options: ["Atropine", "N-Acetylcysteine", "Flumazenil", "Naloxone"],
        correctAnswer: 1,
        explanation: "N-Acetylcysteine (NAC) replenishes glutathione stores in the liver, neutralizing the toxic metabolite NAPQI formed in paracetamol overdose.",
        difficulty: "Medium",
        subject: "Pharmacology",
        year: "Year 2",
        tags: ["Toxicology", "Clinical"]
    },
    {
        id: 402,
        question: "Which drug is a specific inhibitor of the enzyme HMG-CoA Reductase?",
        options: ["Aspirin", "Atorvastatin", "Clopidogrel", "Ezetimibe"],
        correctAnswer: 1,
        explanation: "Statins (like Atorvastatin) competitively inhibit HMG-CoA Reductase, the rate-limiting enzyme in cholesterol synthesis.",
        difficulty: "Easy",
        subject: "Pharmacology",
        year: "Year 2",
        tags: ["Cardiovascular"]
    },
    {
        id: 403,
        question: "Which of the following is a side effect of ACE Inhibitors?",
        options: ["Hypokalemia", "Dry Cough", "Bradycardia", "Hyperglycemia"],
        correctAnswer: 1,
        explanation: "Dry cough is a common side effect of ACE inhibitors due to the accumulation of Bradykinin in the lungs.",
        difficulty: "Medium",
        subject: "Pharmacology",
        year: "Year 2",
        tags: ["Cardiovascular"]
    },
    {
        id: 404,
        question: "The mechanism of action of Omeprazole is:",
        options: ["H2 receptor blockade", "Proton Pump Inhibition (H+/K+ ATPase)", "Neutralization of acid", "Prostaglandin analog"],
        correctAnswer: 1,
        explanation: "Omeprazole irreversibly inhibits the H+/K+ ATPase (Proton Pump) in gastric parietal cells.",
        difficulty: "Easy",
        subject: "Pharmacology",
        year: "Year 2",
        tags: ["GIT"]
    },
    {
        id: 405,
        question: "Which drug is used for the treatment of Anaphylactic Shock?",
        options: ["Hydrocortisone", "Adrenaline (Epinephrine)", "Chlorpheniramine", "Salbutamol"],
        correctAnswer: 1,
        explanation: "Intramuscular Adrenaline is the first-line life-saving treatment for anaphylaxis.",
        difficulty: "Medium",
        subject: "Pharmacology",
        year: "Year 2",
        tags: ["Emergency"]
    },

    // --- MEDICINE (Year 3 & 4) ---
    {
        id: 501,
        question: "A 45-year-old male presents with crushing chest pain radiating to the left arm. ECG shows ST-segment elevation in leads II, III, and aVF. Which coronary artery is most likely occluded?",
        options: ["Left Anterior Descending (LAD)", "Left Circumflex (LCx)", "Right Coronary Artery (RCA)", "Left Main Coronary Artery"],
        correctAnswer: 2,
        explanation: "ST elevation in leads II, III, and aVF indicates an Inferior Wall MI, which is most commonly caused by occlusion of the Right Coronary Artery (RCA).",
        difficulty: "Hard",
        subject: "Medicine",
        year: "Year 4",
        tags: ["Cardiology", "Clinical Case"]
    },
    {
        id: 502,
        question: "Which of the following is the drug of choice for the treatment of severe Falciparum Malaria in a non-pregnant adult?",
        options: ["Chloroquine", "Oral Quinine", "IV Artesunate", "Mefloquine"],
        correctAnswer: 2,
        explanation: "IV Artesunate is the first-line treatment for severe malaria caused by P. falciparum, as it clears parasites faster than quinine and has fewer side effects.",
        difficulty: "Medium",
        subject: "Medicine",
        year: "Year 3",
        tags: ["Infectious Disease", "Guidelines"]
    },
    {
        id: 503,
        question: "Beck's Triad for Cardiac Tamponade includes all EXCEPT:",
        options: ["Hypotension", "Muffled heart sounds", "Distended neck veins", "Bradycardia"],
        correctAnswer: 3,
        explanation: "Beck's Triad consists of Hypotension, Muffled heart sounds, and JVP elevation (Distended neck veins). Bradycardia is NOT part of the triad.",
        difficulty: "Hard",
        subject: "Medicine",
        year: "Year 4",
        tags: ["Cardiology", "Emergency"]
    },
    {
        id: 504,
        question: "The most common cause of Community-Acquired Pneumonia (CAP) is:",
        options: ["Staphylococcus aureus", "Streptococcus pneumoniae", "Mycoplasma pneumoniae", "Klebsiella pneumoniae"],
        correctAnswer: 1,
        explanation: "Streptococcus pneumoniae (Pneumococcus) is the leading cause of CAP worldwide.",
        difficulty: "Easy",
        subject: "Medicine",
        year: "Year 3",
        tags: ["Respiratory"]
    },
    {
        id: 505,
        question: "Which of the following is a feature of Nephrotic Syndrome?",
        options: ["Hematuria", "Massive Proteinuria (>3.5g/day)", "Hypertension", "Oliguria"],
        correctAnswer: 1,
        explanation: "Nephrotic Syndrome is characterized by massive proteinuria (>3.5g/24hr), hypoalbuminemia, edema, and hyperlipidemia.",
        difficulty: "Medium",
        subject: "Medicine",
        year: "Year 4",
        tags: ["Renal"]
    },
    // --- SURGERY (Year 4) ---
    {
        id: 601,
        question: "Murphy's sign is a clinical indication of:",
        options: ["Acute Appendicitis", "Acute Cholecystitis", "Acute Pancreatitis", "Peptic Ulcer Perforation"],
        correctAnswer: 1,
        explanation: "Murphy's sign (inspiratory arrest on deep palpation of the right upper quadrant) is characteristic of Acute Cholecystitis.",
        difficulty: "Easy",
        subject: "Surgery",
        year: "Year 4",
        tags: ["Gastrointestinal", "Clinical Sign"]
    },
    {
        id: 602,
        question: "Which of the following is the most common type of Hernia in females?",
        options: ["Direct Inguinal Hernia", "Indirect Inguinal Hernia", "Femoral Hernia", "Umbilical Hernia"],
        correctAnswer: 1,
        explanation: "Indirect Inguinal Hernia is the most common hernia in both males and females. However, Femoral hernias are more common in females than in males.",
        difficulty: "Medium",
        subject: "Surgery",
        year: "Year 4",
        tags: ["General Surgery"]
    },

    // --- OBSTETRICS & GYNECOLOGY (Year 4) ---
    {
        id: 701,
        question: "The most common cause of Postpartum Hemorrhage (PPH) is:",
        options: ["Uterine Atony", "Trauma/Lacerations", "Retained Placenta", "Coagulopathy"],
        correctAnswer: 0,
        explanation: "Uterine Atony (failure of the uterus to contract) accounts for approximately 80% of PPH cases.",
        difficulty: "Easy",
        subject: "OBGYN",
        year: "Year 4",
        tags: ["Obstetrics", "Emergency"]
    },
    {
        id: 702,
        question: "Which of the following is a risk factor for Ectopic Pregnancy?",
        options: ["Pelvic Inflammatory Disease (PID)", "Use of Oral Contraceptive Pills", "Nulliparity", "Young maternal age"],
        correctAnswer: 0,
        explanation: "PID causes tubal damage and scarring, which is a major risk factor for Ectopic Pregnancy.",
        difficulty: "Medium",
        subject: "OBGYN",
        year: "Year 4",
        tags: ["Gynecology"]
    },

    // --- PEDIATRICS (Year 4) ---
    {
        id: 801,
        question: "Koplik's spots are pathognomonic for which disease?",
        options: ["Rubella", "Measles (Rubeola)", "Chickenpox", "Mumps"],
        correctAnswer: 1,
        explanation: "Koplik's spots (small white spots on the buccal mucosa) are a prodromal sign pathognomonic for Measles.",
        difficulty: "Easy",
        subject: "Pediatrics",
        year: "Year 4",
        tags: ["Infectious Disease", "Clinical Sign"]
    }
];
