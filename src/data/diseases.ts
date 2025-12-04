export interface DiseaseMCQ {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

export interface Disease {
    slug: string;
    name: string;
    subject: string; // e.g., "General Medicine", "Pathology" - Aligned with MBBS
    year: string; // e.g., "MBBS Year 2", "MBBS Year 3"
    description: string;
    icon: string; // Lucide icon name
    content: {
        definition: string;
        causes: string[];
        symptoms: string[];
        diagnosis: string[];
        treatment: string[];
        prevention?: string[];
    };
    mcqs: DiseaseMCQ[];
}

export const diseases: Disease[] = [
    {
        slug: "tuberculosis",
        name: "Tuberculosis (TB)",
        subject: "General Medicine / Pathology",
        year: "MBBS Year 2 & 3",
        description: "Infectious disease caused by Mycobacterium tuberculosis, primarily affecting the lungs.",
        icon: "Activity",
        content: {
            definition: "Tuberculosis (TB) is a potentially serious infectious disease that mainly affects the lungs. The bacteria that cause tuberculosis are spread from person to person through tiny droplets released into the air via coughs and sneezes.",
            causes: [
                "Caused by Mycobacterium tuberculosis bacteria.",
                "Spread through air droplets (coughing, sneezing).",
                "Risk factors: HIV/AIDS, diabetes, kidney disease, cancer treatment."
            ],
            symptoms: [
                "Coughing for three or more weeks.",
                "Coughing up blood or mucus.",
                "Chest pain, or pain with breathing or coughing.",
                "Unintentional weight loss.",
                "Fatigue, Fever, Night sweats."
            ],
            diagnosis: [
                "Mantoux tuberculin skin test.",
                "Blood tests (IGRA).",
                "Chest X-ray.",
                "Sputum examination (AFB smear, Culture, CBNAAT/GeneXpert)."
            ],
            treatment: [
                "Antibiotics for 6-9 months (RIPE therapy: Rifampicin, Isoniazid, Pyrazinamide, Ethambutol).",
                "DOTS (Directly Observed Treatment, Short-course) strategy."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which staining method is primarily used to detect Mycobacterium tuberculosis?",
                options: ["Gram Stain", "Ziehl-Neelsen Stain", "Giemsa Stain", "H&E Stain"],
                correctAnswer: 1,
                explanation: "Ziehl-Neelsen (Acid-Fast) stain is used because the high mycolic acid content in the cell wall makes the bacteria resistant to decolorization by acid-alcohol."
            },
            {
                id: 2,
                question: "Which of the following is NOT a first-line anti-tubercular drug?",
                options: ["Rifampicin", "Isoniazid", "Levofloxacin", "Ethambutol"],
                correctAnswer: 2,
                explanation: "Levofloxacin is a fluoroquinolone and is considered a second-line drug, used for drug-resistant TB."
            },
            {
                id: 3,
                question: "What is the gold standard for the diagnosis of Tuberculosis?",
                options: ["Chest X-ray", "Sputum Culture", "Mantoux Test", "ESR"],
                correctAnswer: 1,
                explanation: "Sputum culture is considered the gold standard as it definitively identifies the organism and allows for drug susceptibility testing."
            }
        ]
    },
    {
        slug: "hypertension",
        name: "Hypertension",
        subject: "General Medicine",
        year: "MBBS Year 3 & 4",
        description: "Long-term medical condition in which the blood pressure in the arteries is persistently elevated.",
        icon: "Heart",
        content: {
            definition: "Hypertension, also known as high blood pressure, is a long-term medical condition in which the blood pressure in the arteries is persistently elevated. It is a major risk factor for coronary artery disease, stroke, heart failure, and chronic kidney disease.",
            causes: [
                "Primary (Essential): No identifiable cause (90-95% of cases). Genetics, diet, obesity, stress.",
                "Secondary: Kidney disease, endocrine disorders (Cushing's, Hyperaldosteronism), drugs (NSAIDs, steroids)."
            ],
            symptoms: [
                "Often asymptomatic ('Silent Killer').",
                "Headaches (especially morning).",
                "Shortness of breath.",
                "Nosebleeds.",
                "Visual changes."
            ],
            diagnosis: [
                "Ambulatory Blood Pressure Monitoring (ABPM).",
                "ECG (to check for LVH).",
                "Urinalysis (proteinuria).",
                "Blood tests (Creatinine, Electrolytes, Glucose, Lipids)."
            ],
            treatment: [
                "Lifestyle modifications (DASH diet, exercise, weight loss, salt restriction).",
                "Antihypertensives: ACE inhibitors, ARBs, Calcium channel blockers, Thiazide diuretics."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which of the following is the most common cause of secondary hypertension?",
                options: ["Pheochromocytoma", "Renal Parenchymal Disease", "Cushing's Syndrome", "Coarctation of Aorta"],
                correctAnswer: 1,
                explanation: "Renal parenchymal disease is the most common cause of secondary hypertension."
            },
            {
                id: 2,
                question: "What is the recommended first-line drug class for a diabetic patient with hypertension?",
                options: ["Beta Blockers", "ACE Inhibitors", "Calcium Channel Blockers", "Loop Diuretics"],
                correctAnswer: 1,
                explanation: "ACE Inhibitors (or ARBs) are preferred in diabetics because they offer renoprotection and slow the progression of diabetic nephropathy."
            }
        ]
    },
    {
        slug: "malaria",
        name: "Malaria",
        subject: "Microbiology / Medicine",
        year: "MBBS Year 2",
        description: "Mosquito-borne infectious disease that affects humans and other animals.",
        icon: "Bug",
        content: {
            definition: "Malaria is a life-threatening disease caused by parasites that are transmitted to people through the bites of infected female Anopheles mosquitoes.",
            causes: [
                "Plasmodium parasites (P. falciparum, P. vivax, P. ovale, P. malariae, P. knowlesi).",
                "Transmitted by female Anopheles mosquito."
            ],
            symptoms: [
                "Fever (often cyclical).",
                "Chills and rigors.",
                "Headache.",
                "Nausea and vomiting.",
                "Muscle pain and fatigue."
            ],
            diagnosis: [
                "Peripheral Blood Smear (Thick and Thin smear).",
                "Rapid Diagnostic Tests (RDTs).",
                "PCR (Polymerase Chain Reaction)."
            ],
            treatment: [
                "Artemisinin-based Combination Therapy (ACT) for P. falciparum.",
                "Chloroquine for chloroquine-sensitive P. vivax.",
                "Primaquine for radical cure (to kill hypnozoites in liver) for P. vivax and P. ovale."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which Plasmodium species is responsible for the most severe form of malaria (Cerebral Malaria)?",
                options: ["P. vivax", "P. falciparum", "P. malariae", "P. ovale"],
                correctAnswer: 1,
                explanation: "P. falciparum causes the most severe malaria, including cerebral malaria, due to the sequestration of infected RBCs in microvasculature."
            },
            {
                id: 2,
                question: "Which drug is used to prevent relapse in P. vivax malaria?",
                options: ["Chloroquine", "Primaquine", "Artemether", "Quinine"],
                correctAnswer: 1,
                explanation: "Primaquine is used to kill the hypnozoites (dormant liver stage) of P. vivax and P. ovale to prevent relapse."
            }
        ]
    },
    // --- YEAR 1 DISEASES (Genetics, Biochemistry, Anatomy) ---
    {
        slug: "down-syndrome",
        name: "Down Syndrome",
        subject: "Anatomy / Genetics",
        year: "MBBS Year 1",
        description: "Genetic disorder caused by Trisomy 21.",
        icon: "Activity",
        content: {
            definition: "Down Syndrome is a chromosomal condition characterized by the presence of an extra copy of chromosome 21 (Trisomy 21).",
            causes: [
                "Nondisjunction during meiosis (95%).",
                "Robertsonian Translocation.",
                "Mosaicism."
            ],
            symptoms: [
                "Intellectual disability.",
                "Characteristic facial features (Flat nasal bridge, Epicanthal folds).",
                "Simian crease (Single palmar crease).",
                "Hypotonia."
            ],
            diagnosis: [
                "Karyotyping (Gold standard).",
                "Prenatal screening (Nuchal translucency, Quad screen).",
                "Cell-free fetal DNA."
            ],
            treatment: [
                "Supportive care.",
                "Early intervention programs.",
                "Management of associated defects (e.g., Congenital heart defects)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "What is the most common cause of Down Syndrome?",
                options: ["Robertsonian Translocation", "Mosaicism", "Meiotic Nondisjunction", "Gene deletion"],
                correctAnswer: 2,
                explanation: "Meiotic nondisjunction (usually maternal) accounts for about 95% of cases."
            },
            {
                id: 2,
                question: "Which congenital heart defect is most commonly associated with Down Syndrome?",
                options: ["Tetralogy of Fallot", "Atrioventricular Septal Defect (AVSD)", "Coarctation of Aorta", "Transposition of Great Arteries"],
                correctAnswer: 1,
                explanation: "Endocardial cushion defects (AVSD) are the most common cardiac anomaly in Down Syndrome."
            }
        ]
    },
    {
        slug: "turner-syndrome",
        name: "Turner Syndrome",
        subject: "Anatomy / Genetics",
        year: "MBBS Year 1",
        description: "Chromosomal condition affecting females (45,X).",
        icon: "Activity",
        content: {
            definition: "Turner Syndrome is a genetic disorder affecting females, where one of the X chromosomes is missing or partially missing.",
            causes: [
                "Monosomy X (45,X).",
                "Mosaicism (45,X/46,XX).",
                "Structural abnormalities of X chromosome."
            ],
            symptoms: [
                "Short stature.",
                "Webbed neck (Pterygium colli).",
                "Primary amenorrhea (Streak ovaries).",
                "Shield chest with widely spaced nipples."
            ],
            diagnosis: [
                "Karyotyping.",
                "Elevated FSH/LH (Hypergonadotropic hypogonadism)."
            ],
            treatment: [
                "Growth hormone therapy.",
                "Estrogen replacement therapy."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "What is the karyotype of classic Turner Syndrome?",
                options: ["46,XX", "47,XXY", "45,X", "47,XXX"],
                correctAnswer: 2,
                explanation: "Classic Turner Syndrome is characterized by complete loss of one X chromosome (45,X)."
            },
            {
                id: 2,
                question: "Which cardiovascular anomaly is frequently associated with Turner Syndrome?",
                options: ["Coarctation of the Aorta", "Patent Ductus Arteriosus", "VSD", "Tetralogy of Fallot"],
                correctAnswer: 0,
                explanation: "Coarctation of the Aorta and Bicuspid Aortic Valve are common in Turner Syndrome."
            }
        ]
    },
    {
        slug: "klinefelter-syndrome",
        name: "Klinefelter Syndrome",
        subject: "Anatomy / Genetics",
        year: "MBBS Year 1",
        description: "Genetic condition in males with an extra X chromosome (47,XXY).",
        icon: "Activity",
        content: {
            definition: "Klinefelter Syndrome is a genetic condition in which a male is born with an extra copy of the X chromosome.",
            causes: [
                "Nondisjunction (47,XXY).",
                "Mosaicism."
            ],
            symptoms: [
                "Tall stature.",
                "Gynecomastia.",
                "Small, firm testes.",
                "Infertility (Azoospermia)."
            ],
            diagnosis: [
                "Karyotyping.",
                "Hormonal profile: High FSH/LH, Low Testosterone."
            ],
            treatment: [
                "Testosterone replacement therapy.",
                "Fertility treatment (ICSI)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "The most common karyotype in Klinefelter Syndrome is:",
                options: ["47,XYY", "47,XXY", "48,XXXY", "46,XY"],
                correctAnswer: 1,
                explanation: "The classic karyotype is 47,XXY."
            },
            {
                id: 2,
                question: "Which of the following is a characteristic feature of Klinefelter Syndrome?",
                options: ["Short stature", "Gynecomastia", "Macroorchidism", "Low FSH"],
                correctAnswer: 1,
                explanation: "Gynecomastia and small testes (microorchidism) are characteristic features."
            }
        ]
    },
    {
        slug: "scurvy",
        name: "Scurvy",
        subject: "Biochemistry",
        year: "MBBS Year 1",
        description: "Disease caused by Vitamin C deficiency.",
        icon: "Activity",
        content: {
            definition: "Scurvy is a disease resulting from a lack of vitamin C (ascorbic acid), leading to defective collagen synthesis.",
            causes: [
                "Dietary deficiency of fruits and vegetables.",
                "Malnutrition.",
                "Alcoholism."
            ],
            symptoms: [
                "Bleeding gums.",
                "Petechiae and Ecchymoses.",
                "Poor wound healing.",
                "Corkscrew hairs."
            ],
            diagnosis: [
                "Clinical presentation.",
                "Serum ascorbic acid levels."
            ],
            treatment: [
                "Vitamin C supplementation.",
                "Dietary modification."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Defective hydroxylation of which amino acids occurs in Scurvy?",
                options: ["Alanine and Glycine", "Proline and Lysine", "Serine and Threonine", "Cysteine and Methionine"],
                correctAnswer: 1,
                explanation: "Vitamin C is a cofactor for Prolyl and Lysyl hydroxylase, essential for collagen stability."
            },
            {
                id: 2,
                question: "Which of the following is a classic sign of Scurvy?",
                options: ["Bitot's spots", "Bleeding gums", "Angular stomatitis", "Dermatitis"],
                correctAnswer: 1,
                explanation: "Spongy, bleeding gums are a hallmark of Scurvy."
            }
        ]
    },
    {
        slug: "rickets",
        name: "Rickets",
        subject: "Biochemistry / Pediatrics",
        year: "MBBS Year 1",
        description: "Defective bone mineralization due to Vitamin D deficiency.",
        icon: "Activity",
        content: {
            definition: "Rickets is a condition that affects bone development in children. It causes soft, weak bones usually due to Vitamin D deficiency.",
            causes: [
                "Vitamin D deficiency (Lack of sunlight, diet).",
                "Calcium deficiency.",
                "Genetic disorders (Vitamin D resistant rickets)."
            ],
            symptoms: [
                "Bowed legs (Genu varum).",
                "Rachitic rosary (Costochondral beading).",
                "Delayed fontanelle closure.",
                "Frontal bossing."
            ],
            diagnosis: [
                "X-ray: Cupping, fraying, splaying of metaphysis.",
                "Labs: Low Calcium, Low Phosphate, High Alkaline Phosphatase (ALP)."
            ],
            treatment: [
                "Vitamin D and Calcium supplementation.",
                "Sunlight exposure."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "The 'Rachitic Rosary' is due to thickening of the:",
                options: ["Costochondral junctions", "Epiphyseal plates", "Vertebral bodies", "Skull sutures"],
                correctAnswer: 0,
                explanation: "Enlargement of the costochondral junctions creates a bead-like appearance on the chest."
            },
            {
                id: 2,
                question: "Which biochemical finding is characteristic of nutritional rickets?",
                options: ["Low ALP", "High Phosphate", "High Alkaline Phosphatase", "High Calcium"],
                correctAnswer: 2,
                explanation: "Elevated Alkaline Phosphatase (ALP) is a sensitive marker of increased bone turnover in rickets."
            }
        ]
    },
    {
        slug: "carpal-tunnel-syndrome",
        name: "Carpal Tunnel Syndrome",
        subject: "Anatomy",
        year: "MBBS Year 1",
        description: "Compression of the median nerve in the wrist.",
        icon: "Activity",
        content: {
            definition: "Carpal Tunnel Syndrome (CTS) is a medical condition due to compression of the median nerve as it travels through the wrist at the carpal tunnel.",
            causes: [
                "Repetitive hand use.",
                "Pregnancy (Fluid retention).",
                "Hypothyroidism.",
                "Rheumatoid Arthritis."
            ],
            symptoms: [
                "Numbness and tingling in thumb, index, and middle fingers.",
                "Thenar muscle wasting (late sign).",
                "Nocturnal pain."
            ],
            diagnosis: [
                "Phalen's test.",
                "Tinel's sign.",
                "Nerve Conduction Studies (NCS)."
            ],
            treatment: [
                "Wrist splinting.",
                "Corticosteroid injections.",
                "Surgical release of Transverse Carpal Ligament."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which nerve is compressed in Carpal Tunnel Syndrome?",
                options: ["Ulnar nerve", "Radial nerve", "Median nerve", "Axillary nerve"],
                correctAnswer: 2,
                explanation: "The Median nerve is compressed within the carpal tunnel."
            },
            {
                id: 2,
                question: "Which test involves flexing the wrists for 60 seconds to reproduce symptoms?",
                options: ["Tinel's test", "Phalen's test", "Finkelstein's test", "Allen's test"],
                correctAnswer: 1,
                explanation: "Phalen's maneuver increases pressure in the carpal tunnel and reproduces symptoms."
            }
        ]
    },
    {
        slug: "diabetes-mellitus",
        name: "Diabetes Mellitus",
        subject: "General Medicine / Endocrinology",
        year: "MBBS Year 4",
        description: "A group of metabolic disorders characterized by high blood sugar levels over a prolonged period.",
        icon: "Activity",
        content: {
            definition: "Diabetes Mellitus (DM) is a chronic metabolic disorder characterized by hyperglycemia resulting from defects in insulin secretion, insulin action, or both.",
            causes: [
                "Type 1: Autoimmune destruction of pancreatic beta cells (absolute insulin deficiency).",
                "Type 2: Insulin resistance and relative insulin deficiency (associated with obesity, genetics).",
                "Gestational: Glucose intolerance during pregnancy."
            ],
            symptoms: [
                "Polyuria (excessive urination).",
                "Polydipsia (excessive thirst).",
                "Polyphagia (excessive hunger).",
                "Unexplained weight loss.",
                "Fatigue, blurred vision, slow-healing sores."
            ],
            diagnosis: [
                "Fasting Plasma Glucose ≥ 126 mg/dL.",
                "HbA1c ≥ 6.5%.",
                "2-hour Plasma Glucose ≥ 200 mg/dL (OGTT).",
                "Random Plasma Glucose ≥ 200 mg/dL with classic symptoms."
            ],
            treatment: [
                "Type 1: Insulin replacement therapy.",
                "Type 2: Lifestyle changes (diet, exercise), Metformin (first-line), Sulfonylureas, DPP-4 inhibitors, SGLT2 inhibitors, GLP-1 agonists, Insulin.",
                "Monitoring: Regular blood glucose and HbA1c checks."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "What is the first-line oral antidiabetic drug for Type 2 Diabetes Mellitus?",
                options: ["Glibenclamide", "Metformin", "Sitagliptin", "Pioglitazone"],
                correctAnswer: 1,
                explanation: "Metformin is the first-line pharmacological treatment for Type 2 Diabetes, improving insulin sensitivity and reducing hepatic glucose production."
            },
            {
                id: 2,
                question: "Which of the following is a microvascular complication of Diabetes?",
                options: ["Coronary Artery Disease", "Stroke", "Diabetic Retinopathy", "Peripheral Vascular Disease"],
                correctAnswer: 2,
                explanation: "Diabetic Retinopathy, Nephropathy, and Neuropathy are microvascular complications. CAD, Stroke, and PVD are macrovascular."
            }
        ]
    },
    {
        slug: "pneumonia",
        name: "Pneumonia",
        subject: "General Medicine / Respiratory",
        year: "MBBS Year 3",
        description: "Inflammatory condition of the lung primarily affecting the small air sacs known as alveoli.",
        icon: "Wind",
        content: {
            definition: "Pneumonia is an infection that inflames the air sacs in one or both lungs. The air sacs may fill with fluid or pus (purulent material), causing cough with phlegm or pus, fever, chills, and difficulty breathing.",
            causes: [
                "Bacteria: Streptococcus pneumoniae (most common), Haemophilus influenzae.",
                "Viruses: Influenza, RSV, SARS-CoV-2.",
                "Fungi: Pneumocystis jirovecii (in immunocompromised).",
                "Aspiration of food or fluids."
            ],
            symptoms: [
                "Cough (productive or dry).",
                "Fever, sweating, and shaking chills.",
                "Shortness of breath (dyspnea).",
                "Chest pain (pleuritic).",
                "Fatigue, nausea, vomiting."
            ],
            diagnosis: [
                "Chest X-ray (consolidation/infiltrates).",
                "Blood tests (CBC, CRP).",
                "Sputum culture.",
                "Pulse oximetry."
            ],
            treatment: [
                "Antibiotics (e.g., Amoxicillin, Azithromycin, Ceftriaxone) for bacterial pneumonia.",
                "Antivirals for viral pneumonia.",
                "Supportive care: Fluids, antipyretics, oxygen therapy if hypoxic."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "What is the most common cause of Community-Acquired Pneumonia (CAP)?",
                options: ["Staphylococcus aureus", "Streptococcus pneumoniae", "Mycoplasma pneumoniae", "Klebsiella pneumoniae"],
                correctAnswer: 1,
                explanation: "Streptococcus pneumoniae (Pneumococcus) is the leading cause of bacterial community-acquired pneumonia worldwide."
            },
            {
                id: 2,
                question: "Which clinical sign is characteristic of lobar pneumonia?",
                options: ["Hyperresonant percussion note", "Bronchial breath sounds", "Decreased vocal fremitus", "Tracheal deviation away from lesion"],
                correctAnswer: 1,
                explanation: "Consolidation in lobar pneumonia leads to bronchial breath sounds and increased vocal fremitus over the affected area."
            }
        ]
    },
    {
        slug: "typhoid-fever",
        name: "Typhoid Fever",
        subject: "Microbiology / Medicine",
        year: "MBBS Year 2",
        description: "Systemic bacterial infection caused by Salmonella Typhi.",
        icon: "Bug",
        content: {
            definition: "Typhoid fever is a life-threatening infection caused by the bacterium Salmonella Typhi. It is usually spread through contaminated food or water.",
            causes: [
                "Salmonella Typhi bacteria.",
                "Fecal-oral transmission.",
                "Carriers (e.g., 'Typhoid Mary') can spread infection without symptoms."
            ],
            symptoms: [
                "Prolonged high fever (Step-ladder pattern).",
                "Fatigue, headache, nausea.",
                "Abdominal pain, constipation or diarrhea.",
                "Rose spots on the chest."
            ],
            diagnosis: [
                "Blood culture (1st week - Gold standard).",
                "Widal test (2nd week - less specific).",
                "Stool culture (3rd week).",
                "Urine culture (4th week)."
            ],
            treatment: [
                "Antibiotics: Ceftriaxone, Azithromycin, Ciprofloxacin.",
                "Fluids and rehydration."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "What is the gold standard for diagnosis of Typhoid fever in the first week?",
                options: ["Widal Test", "Blood Culture", "Stool Culture", "Urine Culture"],
                correctAnswer: 1,
                explanation: "Blood culture is the most sensitive diagnostic method during the first week of infection."
            },
            {
                id: 2,
                question: "Which of the following is a characteristic clinical sign of Typhoid?",
                options: ["Koplik's spots", "Rose spots", "Bitot's spots", "Target lesions"],
                correctAnswer: 1,
                explanation: "Rose spots (faint pink spots on the trunk) are a classic but rare sign of Typhoid fever."
            }
        ]
    },
    {
        slug: "dengue-fever",
        name: "Dengue Fever",
        subject: "Microbiology / Medicine",
        year: "MBBS Year 2",
        description: "Mosquito-borne viral infection causing severe flu-like illness.",
        icon: "Bug",
        content: {
            definition: "Dengue is a viral infection transmitted to humans through the bite of infected mosquitoes (Aedes aegypti). It is found in tropical and sub-tropical climates.",
            causes: [
                "Dengue virus (DENV 1-4 serotypes).",
                "Vector: Aedes aegypti mosquito (day-biting)."
            ],
            symptoms: [
                "High fever.",
                "Severe headache (Retro-orbital pain).",
                "Severe joint and muscle pain ('Breakbone fever').",
                "Rash.",
                "Mild bleeding (nose, gums)."
            ],
            diagnosis: [
                "NS1 Antigen test (First 5 days).",
                "IgM/IgG Antibody test (After 5 days).",
                "CBC: Thrombocytopenia (low platelets), Leukopenia."
            ],
            treatment: [
                "Symptomatic: Fluids, Paracetamol for fever.",
                "Avoid NSAIDs (Aspirin, Ibuprofen) due to bleeding risk.",
                "Monitoring of platelet count and hematocrit."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which mosquito is the primary vector for Dengue virus?",
                options: ["Anopheles", "Culex", "Aedes aegypti", "Mansonia"],
                correctAnswer: 2,
                explanation: "Aedes aegypti is the primary vector. It typically bites during the day."
            },
            {
                id: 2,
                question: "Which test is most appropriate for diagnosing Dengue in the first 3 days of fever?",
                options: ["IgM ELISA", "IgG ELISA", "NS1 Antigen", "Widal Test"],
                correctAnswer: 2,
                explanation: "NS1 Antigen detection is highly specific and sensitive during the early viremic phase (days 1-5)."
            }
        ]
    },
    {
        slug: "iron-deficiency-anemia",
        name: "Iron Deficiency Anemia",
        subject: "Pathology / Medicine",
        year: "MBBS Year 2",
        description: "A condition where the body lacks enough iron to produce hemoglobin.",
        icon: "Activity",
        content: {
            definition: "Iron deficiency anemia is a common type of anemia where blood lacks adequate healthy red blood cells due to insufficient iron.",
            causes: [
                "Blood loss (Menstruation, GI bleed).",
                "Lack of iron in diet.",
                "Inability to absorb iron (Celiac disease).",
                "Pregnancy (increased demand)."
            ],
            symptoms: [
                "Extreme fatigue and weakness.",
                "Pale skin (Pallor).",
                "Shortness of breath.",
                "Pica (craving for non-food items like ice/dirt).",
                "Koilonychia (Spoon-shaped nails)."
            ],
            diagnosis: [
                "CBC: Low Hb, Low MCV (Microcytic), Low MCH (Hypochromic).",
                "Iron Studies: Low Serum Iron, Low Ferritin, High TIBC.",
                "Peripheral Smear: Microcytic hypochromic RBCs, Pencil cells."
            ],
            treatment: [
                "Oral Iron supplements (Ferrous sulfate).",
                "Vitamin C (enhances absorption).",
                "Treating the underlying cause (e.g., deworming, stopping bleeding)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which of the following is the most sensitive indicator of iron stores in the body?",
                options: ["Serum Iron", "Serum Ferritin", "TIBC", "Transferrin Saturation"],
                correctAnswer: 1,
                explanation: "Serum Ferritin is the most sensitive and specific test for iron deficiency, reflecting body iron stores."
            },
            {
                id: 2,
                question: "Koilonychia (spoon-shaped nails) is a clinical feature of:",
                options: ["Megaloblastic Anemia", "Iron Deficiency Anemia", "Thalassemia", "Sideroblastic Anemia"],
                correctAnswer: 1,
                explanation: "Koilonychia is a classic sign of chronic iron deficiency anemia."
            }
        ]
    },
    {
        slug: "hepatitis-b",
        name: "Hepatitis B",
        subject: "Microbiology / Medicine",
        year: "MBBS Year 2",
        description: "Viral infection that attacks the liver and can cause both acute and chronic disease.",
        icon: "Activity",
        content: {
            definition: "Hepatitis B is a viral infection that attacks the liver. It can cause both acute and chronic disease and is a major global health problem.",
            causes: [
                "Hepatitis B Virus (HBV).",
                "Transmission: Blood, sexual contact, mother-to-child.",
                "Risk factors: Unprotected sex, IV drug use, healthcare exposure."
            ],
            symptoms: [
                "Jaundice (yellowing of skin and eyes).",
                "Dark urine.",
                "Extreme fatigue.",
                "Nausea, vomiting, abdominal pain."
            ],
            diagnosis: [
                "HBsAg (Surface Antigen) - Hallmark of infection.",
                "Anti-HBs (Surface Antibody) - Indicates immunity.",
                "IgM anti-HBc - Indicates acute infection.",
                "HBV DNA (Viral load)."
            ],
            treatment: [
                "Acute: Supportive care.",
                "Chronic: Antivirals (Entecavir, Tenofovir).",
                "Prevention: Hepatitis B Vaccine (0, 1, 6 months)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which serological marker indicates immunity to Hepatitis B due to vaccination?",
                options: ["HBsAg", "Anti-HBc IgG", "Anti-HBs", "HBeAg"],
                correctAnswer: 2,
                explanation: "Anti-HBs (Hepatitis B surface antibody) is the only marker present after successful vaccination."
            },
            {
                id: 2,
                question: "Which antigen is the first to appear in the blood after infection with HBV?",
                options: ["HBsAg", "HBeAg", "HBcAg", "Anti-HBs"],
                correctAnswer: 0,
                explanation: "HBsAg is the first serological marker to appear in acute Hepatitis B infection."
            }
        ]
    },
    {
        slug: "otitis-media",
        name: "Acute Otitis Media",
        subject: "ENT",
        year: "MBBS Year 3",
        description: "Infection of the middle ear, common in children.",
        icon: "Activity",
        content: {
            definition: "Acute Otitis Media (AOM) is a painful type of ear infection. It occurs when the area behind the eardrum becomes inflamed and infected.",
            causes: [
                "Bacteria: Streptococcus pneumoniae, Haemophilus influenzae, Moraxella catarrhalis.",
                "Eustachian tube dysfunction.",
                "Upper respiratory tract infections."
            ],
            symptoms: [
                "Ear pain (Otalgia).",
                "Fever.",
                "Fluid drainage from ear.",
                "Hearing loss.",
                "Irritability in children."
            ],
            diagnosis: [
                "Otoscopy: Bulging, erythematous tympanic membrane.",
                "Decreased mobility of TM (Pneumatic otoscopy)."
            ],
            treatment: [
                "Analgesics (Ibuprofen, Acetaminophen).",
                "Antibiotics (Amoxicillin) if severe or not resolving.",
                "Myringotomy (ear tubes) for recurrent cases."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "What is the most common bacterial cause of Acute Otitis Media?",
                options: ["Pseudomonas aeruginosa", "Staphylococcus aureus", "Streptococcus pneumoniae", "Klebsiella"],
                correctAnswer: 2,
                explanation: "Streptococcus pneumoniae is the most common bacterial pathogen causing AOM."
            },
            {
                id: 2,
                question: "Which otoscopic finding is most specific for Acute Otitis Media?",
                options: ["Retracted TM", "Bulging TM", "Perforated TM", "Normal TM"],
                correctAnswer: 1,
                explanation: "A bulging tympanic membrane is the hallmark sign of Acute Otitis Media."
            }
        ]
    },
    {
        slug: "cataract",
        name: "Cataract",
        subject: "Ophthalmology",
        year: "MBBS Year 3",
        description: "Clouding of the lens of the eye which leads to a decrease in vision.",
        icon: "Activity",
        content: {
            definition: "A cataract is a clouding of the normally clear lens of the eye. It is the leading cause of blindness worldwide.",
            causes: [
                "Aging (Senile cataract) - Most common.",
                "Diabetes mellitus.",
                "Trauma.",
                "Steroid use.",
                "UV radiation exposure."
            ],
            symptoms: [
                "Blurred or dim vision.",
                "Difficulty with vision at night.",
                "Sensitivity to light and glare.",
                "Halos around lights.",
                "Fading or yellowing of colors."
            ],
            diagnosis: [
                "Visual acuity test.",
                "Slit-lamp examination.",
                "Retinal exam."
            ],
            treatment: [
                "Surgery: Phacoemulsification with Intraocular Lens (IOL) implantation.",
                "Glasses (early stages)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which type of cataract is most commonly associated with long-term steroid use?",
                options: ["Nuclear Sclerosis", "Posterior Subcapsular", "Cortical", "Lamellar"],
                correctAnswer: 1,
                explanation: "Posterior Subcapsular Cataract is classically associated with prolonged corticosteroid use."
            },
            {
                id: 2,
                question: "What is the surgery of choice for cataract today?",
                options: ["ICCE", "ECCE", "Phacoemulsification", "Couching"],
                correctAnswer: 2,
                explanation: "Phacoemulsification with foldable IOL implantation is the gold standard surgical technique."
            }
        ]
    },
    {
        slug: "acute-appendicitis",
        name: "Acute Appendicitis",
        subject: "Surgery",
        year: "MBBS Year 4",
        description: "Inflammation of the appendix, a medical emergency.",
        icon: "Activity",
        content: {
            definition: "Acute appendicitis is the acute inflammation of the vermiform appendix, usually resulting from obstruction of the lumen.",
            causes: [
                "Obstruction by fecalith (most common in adults).",
                "Lymphoid hyperplasia (most common in children).",
                "Foreign bodies, tumors."
            ],
            symptoms: [
                "Periumbilical pain shifting to Right Iliac Fossa (RIF).",
                "Anorexia, Nausea, Vomiting.",
                "Fever."
            ],
            diagnosis: [
                "Clinical: McBurney's tenderness, Rovsing's sign.",
                "Alvarado Score.",
                "USG Abdomen / CT Scan."
            ],
            treatment: [
                "Appendectomy (Laparoscopic or Open).",
                "IV Antibiotics."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Pain starting in the periumbilical region and shifting to the right iliac fossa is characteristic of:",
                options: ["Acute Pancreatitis", "Acute Appendicitis", "Renal Colic", "Diverticulitis"],
                correctAnswer: 1,
                explanation: "This classic migration of pain is highly suggestive of Acute Appendicitis."
            },
            {
                id: 2,
                question: "Which sign is elicited by deep palpation of the left iliac fossa causing pain in the right iliac fossa?",
                options: ["Psoas sign", "Obturator sign", "Rovsing's sign", "Murphy's sign"],
                correctAnswer: 2,
                explanation: "Rovsing's sign is positive when pressure on the left lower quadrant causes pain in the right lower quadrant."
            }
        ]
    },
    {
        slug: "pre-eclampsia",
        name: "Pre-eclampsia",
        subject: "OBGYN",
        year: "MBBS Year 4",
        description: "Pregnancy complication characterized by high blood pressure.",
        icon: "Activity",
        content: {
            definition: "Pre-eclampsia is a disorder of pregnancy characterized by the onset of high blood pressure and often a significant amount of protein in the urine.",
            causes: [
                "Abnormal placentation.",
                "Immunologic factors.",
                "Genetic predisposition."
            ],
            symptoms: [
                "High blood pressure (>140/90 mmHg).",
                "Proteinuria.",
                "Severe headache.",
                "Visual disturbances.",
                "Epigastric pain."
            ],
            diagnosis: [
                "BP measurement.",
                "Urine protein test.",
                "Blood tests (LFTs, Platelets)."
            ],
            treatment: [
                "Delivery of the baby (definitive treatment).",
                "Antihypertensives (Labetalol, Methyldopa).",
                "Magnesium Sulfate (seizure prophylaxis)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "What is the drug of choice for the prevention of seizures in severe pre-eclampsia?",
                options: ["Diazepam", "Phenytoin", "Magnesium Sulfate", "Labetalol"],
                correctAnswer: 2,
                explanation: "Magnesium Sulfate is the gold standard for seizure prophylaxis in pre-eclampsia and treatment of eclampsia."
            },
            {
                id: 2,
                question: "Pre-eclampsia is defined as hypertension with proteinuria developing after how many weeks of gestation?",
                options: ["12 weeks", "20 weeks", "28 weeks", "32 weeks"],
                correctAnswer: 1,
                explanation: "Pre-eclampsia is defined as new-onset hypertension and proteinuria after 20 weeks of gestation."
            }
        ]
    },
    {
        slug: "bronchial-asthma",
        name: "Bronchial Asthma",
        subject: "General Medicine / Respiratory",
        year: "MBBS Year 3",
        description: "Chronic inflammatory disorder of the airways.",
        icon: "Wind",
        content: {
            definition: "Asthma is a chronic condition involving airway inflammation, intermittent airflow obstruction, and bronchial hyperresponsiveness.",
            causes: [
                "Allergens (Pollen, Dust mites).",
                "Respiratory infections.",
                "Exercise, Cold air.",
                "Genetic predisposition (Atopy)."
            ],
            symptoms: [
                "Wheezing (Whistling sound).",
                "Shortness of breath.",
                "Chest tightness.",
                "Cough (worse at night)."
            ],
            diagnosis: [
                "Spirometry: Reduced FEV1/FVC ratio, reversible with bronchodilator.",
                "Peak Expiratory Flow (PEF) variability.",
                "Skin prick test for allergens."
            ],
            treatment: [
                "Relievers: SABA (Salbutamol).",
                "Controllers: Inhaled Corticosteroids (ICS).",
                "Severe: LABA, LAMA, Biologics (Omalizumab)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which of the following is the hallmark of bronchial asthma on spirometry?",
                options: ["Irreversible airflow limitation", "Reversible airflow obstruction", "Restrictive pattern", "Reduced TLC"],
                correctAnswer: 1,
                explanation: "Asthma is characterized by reversible airflow obstruction (FEV1 improves >12% after bronchodilator)."
            },
            {
                id: 2,
                question: "What is the first-line controller medication for persistent asthma?",
                options: ["Oral Steroids", "Inhaled Corticosteroids (ICS)", "Long-acting Beta Agonists (LABA)", "Theophylline"],
                correctAnswer: 1,
                explanation: "Inhaled Corticosteroids are the most effective anti-inflammatory medications for persistent asthma."
            }
        ]
    },
    {
        slug: "rheumatic-fever",
        name: "Rheumatic Fever",
        subject: "General Medicine / Cardiology",
        year: "MBBS Year 3",
        description: "Inflammatory disease following Streptococcus infection.",
        icon: "Heart",
        content: {
            definition: "Acute Rheumatic Fever (ARF) is a multisystem inflammatory disease that occurs as a delayed sequela of Group A Streptococcal pharyngitis.",
            causes: [
                "Group A Beta-Hemolytic Streptococcus (GABHS).",
                "Molecular mimicry between bacterial M protein and human tissues."
            ],
            symptoms: [
                "Jones Criteria (Major): Carditis, Migratory Polyarthritis, Chorea, Erythema Marginatum, Subcutaneous Nodules.",
                "Minor: Fever, Arthralgia, Elevated ESR/CRP."
            ],
            diagnosis: [
                "Modified Jones Criteria (2 Major or 1 Major + 2 Minor) + Evidence of antecedent Strep infection (ASO titer)."
            ],
            treatment: [
                "Antibiotics: Penicillin (Benzathine Penicillin G).",
                "Anti-inflammatory: Aspirin (Salicylates), Steroids (for severe carditis).",
                "Secondary Prophylaxis: Long-term Penicillin."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which of the following is a Major Jones Criterion for Rheumatic Fever?",
                options: ["Fever", "Arthralgia", "Sydenham's Chorea", "Elevated ESR"],
                correctAnswer: 2,
                explanation: "Sydenham's Chorea is a Major criterion. Fever, Arthralgia, and Elevated ESR are Minor criteria."
            },
            {
                id: 2,
                question: "The most common valvular lesion in Chronic Rheumatic Heart Disease is:",
                options: ["Mitral Stenosis", "Aortic Stenosis", "Mitral Regurgitation", "Tricuspid Regurgitation"],
                correctAnswer: 0,
                explanation: "Mitral Stenosis is the classic and most common valvular lesion in chronic rheumatic heart disease."
            }
        ]
    },
    {
        slug: "cholelithiasis",
        name: "Cholelithiasis (Gallstones)",
        subject: "Surgery",
        year: "MBBS Year 4",
        description: "Presence of stones in the gallbladder.",
        icon: "Activity",
        content: {
            definition: "Cholelithiasis refers to the presence of stones (calculi) within the gallbladder.",
            causes: [
                "Cholesterol supersaturation (Cholesterol stones).",
                "Hemolysis (Pigment stones).",
                "Risk Factors (5F's): Fat, Female, Forty, Fertile, Fair."
            ],
            symptoms: [
                "Biliary Colic (RUQ pain after fatty meal).",
                "Nausea, Vomiting.",
                "Asymptomatic (80%)."
            ],
            diagnosis: [
                "USG Abdomen (Gold Standard).",
                "HIDA Scan (if USG equivocal)."
            ],
            treatment: [
                "Laparoscopic Cholecystectomy (Symptomatic).",
                "Ursodeoxycholic acid (Medical dissolution - rare)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "What is the gold standard investigation for Cholelithiasis?",
                options: ["CT Scan", "MRI", "Ultrasonography (USG)", "ERCP"],
                correctAnswer: 2,
                explanation: "USG is the initial and most sensitive modality for detecting gallstones."
            },
            {
                id: 2,
                question: "Which of the following is NOT part of the '5 Fs' risk factors for gallstones?",
                options: ["Fat", "Female", "Forty", "Febrile"],
                correctAnswer: 3,
                explanation: "The 5 Fs are Fat, Female, Forty, Fertile, and Fair. Febrile is not a risk factor."
            }
        ]
    },
    {
        slug: "inguinal-hernia",
        name: "Inguinal Hernia",
        subject: "Surgery",
        year: "MBBS Year 4",
        description: "Protrusion of abdominal contents through the inguinal canal.",
        icon: "Activity",
        content: {
            definition: "An inguinal hernia is a protrusion of abdominal-cavity contents through the inguinal canal.",
            causes: [
                "Weakness of abdominal wall.",
                "Increased intra-abdominal pressure (Coughing, Lifting).",
                "Patent Processus Vaginalis (Indirect)."
            ],
            symptoms: [
                "Groin bulge (increases with straining).",
                "Pain or discomfort.",
                "Complications: Obstruction, Strangulation."
            ],
            diagnosis: [
                "Clinical Examination (Cough impulse).",
                "USG Groin."
            ],
            treatment: [
                "Hernioplasty (Mesh repair - Lichtenstein).",
                "Herniotomy (Children)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which type of inguinal hernia passes through the deep inguinal ring?",
                options: ["Direct Inguinal Hernia", "Indirect Inguinal Hernia", "Femoral Hernia", "Obturator Hernia"],
                correctAnswer: 1,
                explanation: "Indirect Inguinal Hernias pass through the deep inguinal ring, lateral to the inferior epigastric vessels."
            },
            {
                id: 2,
                question: "The landmark distinguishing direct from indirect inguinal hernias is:",
                options: ["Femoral artery", "Inferior Epigastric vessels", "Spermatic cord", "Inguinal ligament"],
                correctAnswer: 1,
                explanation: "Indirect hernias are lateral, and Direct hernias are medial to the Inferior Epigastric vessels."
            }
        ]
    },
    {
        slug: "breast-cancer",
        name: "Breast Cancer",
        subject: "Surgery / Oncology",
        year: "MBBS Year 4",
        description: "Malignant tumor of the breast.",
        icon: "Activity",
        content: {
            definition: "Breast cancer is a malignant tumor that starts in the cells of the breast. It is the most common cancer in women worldwide.",
            causes: [
                "BRCA1/BRCA2 gene mutations.",
                "Hormonal exposure (Early menarche, Late menopause).",
                "Family history.",
                "Age, Obesity."
            ],
            symptoms: [
                "Painless lump in breast.",
                "Nipple discharge (Bloody).",
                "Skin changes (Peau d'orange).",
                "Axillary lymphadenopathy."
            ],
            diagnosis: [
                "Triple Assessment: Clinical Exam + Imaging (Mammogram/USG) + Biopsy (Core needle).",
                "Receptor status (ER/PR/HER2)."
            ],
            treatment: [
                "Surgery (Mastectomy or Breast Conservation).",
                "Chemotherapy, Radiotherapy.",
                "Hormonal therapy (Tamoxifen), Targeted therapy (Trastuzumab)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which of the following is the most common histological type of breast cancer?",
                options: ["Invasive Lobular Carcinoma", "Invasive Ductal Carcinoma", "Medullary Carcinoma", "Mucinous Carcinoma"],
                correctAnswer: 1,
                explanation: "Invasive Ductal Carcinoma (IDC) accounts for about 80% of all breast cancers."
            },
            {
                id: 2,
                question: "Peau d'orange appearance of the breast skin is due to:",
                options: ["Hematoma", "Lymphatic obstruction", "Venous obstruction", "Fat necrosis"],
                correctAnswer: 1,
                explanation: "Peau d'orange is caused by cutaneous lymphatic edema due to blockage by cancer cells."
            }
        ]
    }
];
