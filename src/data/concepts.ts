export interface MCQ {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
    explanation: string;
}

export interface Concept {
    slug: string;
    title: string;
    description: string;
    icon: string; // Lucide icon name or image path
    year: string; // Added year property
    content: {
        introduction: string;
        keyPoints: string[];
        diagramUrl?: string;
    };
    mcqs: MCQ[];
}

export const medicalConcepts: Concept[] = [
    {
        slug: "cardiology-basics",
        title: "Cardiology Basics",
        description: "Understand the fundamentals of the heart, blood flow, and cardiac cycle.",
        icon: "Heart",
        year: "Year 1",
        content: {
            introduction: "Cardiology is the study of the heart and blood vessels. The heart is a muscular organ that pumps blood through the blood vessels of the circulatory system. The pumped blood carries oxygen and nutrients to the body, while carrying metabolic waste such as carbon dioxide to the lungs.",
            keyPoints: [
                "The heart has four chambers: two atria and two ventricles.",
                "Arteries carry oxygenated blood away from the heart (except pulmonary artery).",
                "Veins carry deoxygenated blood towards the heart (except pulmonary vein).",
                "The cardiac cycle consists of systole (contraction) and diastole (relaxation).",
                "The SA node is the natural pacemaker of the heart."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which chamber of the heart pumps oxygenated blood to the body?",
                options: ["Right Atrium", "Right Ventricle", "Left Atrium", "Left Ventricle"],
                correctAnswer: 3,
                explanation: "The Left Ventricle pumps oxygen-rich blood into the aorta to be distributed to the rest of the body."
            },
            {
                id: 2,
                question: "What is the natural pacemaker of the heart?",
                options: ["AV Node", "SA Node", "Bundle of His", "Purkinje Fibers"],
                correctAnswer: 1,
                explanation: "The Sinoatrial (SA) node initiates the electrical impulse that causes the heart to beat."
            },
            {
                id: 3,
                question: "Which vessel carries deoxygenated blood from the heart to the lungs?",
                options: ["Aorta", "Pulmonary Vein", "Pulmonary Artery", "Superior Vena Cava"],
                correctAnswer: 2,
                explanation: "The Pulmonary Artery carries deoxygenated blood from the right ventricle to the lungs for oxygenation."
            }
        ]
    },
    {
        slug: "neurology-basics",
        title: "Neurology Basics",
        description: "Explore the nervous system, neurons, and brain function.",
        icon: "Brain",
        year: "Year 1",
        content: {
            introduction: "Neurology focuses on the nervous system, which includes the brain, spinal cord, and peripheral nerves. The fundamental unit of the nervous system is the neuron, which transmits signals through electrical and chemical synapses.",
            keyPoints: [
                "The Central Nervous System (CNS) consists of the brain and spinal cord.",
                "The Peripheral Nervous System (PNS) connects the CNS to the rest of the body.",
                "Neurons have three main parts: dendrites, cell body (soma), and axon.",
                "Myelin sheath insulates axons and speeds up signal transmission.",
                "Neurotransmitters are chemicals that transmit signals across synapses."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "What is the functional unit of the nervous system?",
                options: ["Nephron", "Neuron", "Alveoli", "Sarcomere"],
                correctAnswer: 1,
                explanation: "The Neuron is the specialized cell designed to transmit information to other nerve cells, muscle, or gland cells."
            },
            {
                id: 2,
                question: "Which part of the brain is responsible for balance and coordination?",
                options: ["Cerebrum", "Cerebellum", "Brainstem", "Thalamus"],
                correctAnswer: 1,
                explanation: "The Cerebellum is primarily responsible for motor control, including balance, coordination, and posture."
            },
            {
                id: 3,
                question: "What substance insulates the axon and increases transmission speed?",
                options: ["Myelin", "Dopamine", "Collagen", "Keratin"],
                correctAnswer: 0,
                explanation: "Myelin is a fatty substance that forms a sheath around axons, allowing for faster electrical impulse conduction."
            }
        ]
    },
    {
        slug: "respiratory-system",
        title: "Respiratory System",
        description: "Learn about gas exchange, lungs, and breathing mechanics.",
        icon: "Wind",
        year: "Year 1",
        content: {
            introduction: "The respiratory system is responsible for taking in oxygen and expelling carbon dioxide. The primary organs of the respiratory system are the lungs, which carry out this exchange of gases as we breathe.",
            keyPoints: [
                "Gas exchange occurs in the alveoli.",
                "The diaphragm is the primary muscle of respiration.",
                "Inhalation is an active process; exhalation is generally passive.",
                "Oxygen is transported in the blood primarily bound to hemoglobin.",
                "The trachea divides into two bronchi, which further divide into bronchioles."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Where does gas exchange occur in the lungs?",
                options: ["Bronchi", "Trachea", "Alveoli", "Pleura"],
                correctAnswer: 2,
                explanation: "Alveoli are tiny air sacs at the end of the bronchioles where the exchange of oxygen and carbon dioxide takes place."
            },
            {
                id: 2,
                question: "What is the primary muscle responsible for breathing?",
                options: ["Intercostals", "Diaphragm", "Abdominals", "Sternocleidomastoid"],
                correctAnswer: 1,
                explanation: "The Diaphragm is a dome-shaped muscle located below the lungs that contracts to allow inhalation."
            }
        ]
    },
    {
        slug: "action-potential",
        title: "Action Potential",
        description: "The electrical signal that propagates along the axon of a neuron.",
        icon: "Activity",
        year: "Year 1",
        content: {
            introduction: "An action potential is a rapid rise and fall in voltage or membrane potential across a cellular membrane with a characteristic pattern. It is the fundamental unit of communication in the nervous system.",
            keyPoints: [
                "Resting Membrane Potential: Approx -70mV, maintained by Na+/K+ pump.",
                "Depolarization: Influx of Na+ ions through voltage-gated channels.",
                "Repolarization: Efflux of K+ ions.",
                "Hyperpolarization: Membrane potential becomes more negative than resting potential.",
                "Refractory Period: Time during which another action potential cannot be generated (Absolute) or requires stronger stimulus (Relative)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which ion is primarily responsible for the depolarization phase of an action potential?",
                options: ["Potassium (K+)", "Sodium (Na+)", "Calcium (Ca2+)", "Chloride (Cl-)"],
                correctAnswer: 1,
                explanation: "The rapid influx of Sodium (Na+) ions through voltage-gated channels causes the membrane potential to become positive (depolarization)."
            },
            {
                id: 2,
                question: "What is the approximate resting membrane potential of a typical neuron?",
                options: ["0 mV", "-90 mV", "-70 mV", "+30 mV"],
                correctAnswer: 2,
                explanation: "The resting membrane potential of a typical neuron is approximately -70 mV."
            }
        ]
    },
    {
        slug: "inflammation",
        title: "Acute Inflammation",
        description: "The body's initial response to harmful stimuli, involving vascular and cellular events.",
        icon: "Activity",
        year: "Year 2",
        content: {
            introduction: "Acute inflammation is a rapid host response that serves to deliver leukocytes and plasma proteins, such as antibodies, to sites of infection or tissue injury.",
            keyPoints: [
                "Cardinal Signs: Rubor (Redness), Calor (Heat), Tumor (Swelling), Dolor (Pain), Functio laesa (Loss of function).",
                "Vascular Events: Vasodilation (Histamine) and increased vascular permeability.",
                "Cellular Events: Margination, Rolling, Adhesion, Transmigration (Diapedesis), Chemotaxis.",
                "Neutrophils are the first cells to arrive at the site of acute inflammation."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which of the following is the first vascular change to occur in acute inflammation?",
                options: ["Vasodilation", "Vasoconstriction", "Increased permeability", "Stasis"],
                correctAnswer: 1,
                explanation: "Transient vasoconstriction occurs immediately after injury, followed quickly by persistent vasodilation."
            },
            {
                id: 2,
                question: "Which cell type is the hallmark of acute inflammation?",
                options: ["Macrophage", "Lymphocyte", "Neutrophil", "Plasma cell"],
                correctAnswer: 2,
                explanation: "Neutrophils (Polymorphonuclear leukocytes) are the first leukocytes to be recruited to the site of acute inflammation."
            }
        ]
    },
    {
        slug: "cell-membrane",
        title: "Cell Membrane Structure",
        description: "Structure and function of the plasma membrane.",
        icon: "Activity",
        year: "Year 1",
        content: {
            introduction: "The cell membrane is a biological membrane that separates the interior of all cells from the outside environment. It consists of a lipid bilayer with embedded proteins.",
            keyPoints: [
                "Fluid Mosaic Model.",
                "Phospholipid bilayer: Hydrophilic heads, Hydrophobic tails.",
                "Integral and Peripheral proteins.",
                "Cholesterol regulates membrane fluidity.",
                "Functions: Protection, Transport, Signaling."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which component of the cell membrane is primarily responsible for maintaining fluidity?",
                options: ["Glycolipids", "Cholesterol", "Integral proteins", "Peripheral proteins"],
                correctAnswer: 1,
                explanation: "Cholesterol intercalates between phospholipid molecules and prevents them from packing too closely or becoming too fluid."
            },
            {
                id: 2,
                question: "What is the primary function of the phospholipid bilayer?",
                options: ["Cell signaling", "Structural support", "Selective permeability", "Energy storage"],
                correctAnswer: 2,
                explanation: "The hydrophobic core of the bilayer prevents the free passage of ions and polar molecules, creating a selective barrier."
            }
        ]
    },
    {
        slug: "muscle-contraction",
        title: "Muscle Contraction",
        description: "Mechanism of skeletal muscle contraction (Sliding Filament Theory).",
        icon: "Activity",
        year: "Year 1",
        content: {
            introduction: "Muscle contraction occurs via the sliding filament theory, where actin and myosin filaments slide past each other to shorten the sarcomere.",
            keyPoints: [
                "Sarcomere is the functional unit.",
                "Calcium binds to Troponin C.",
                "Tropomyosin moves, exposing binding sites on Actin.",
                "Myosin heads bind to Actin (Cross-bridge formation).",
                "Power stroke requires ATP hydrolysis."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which ion is essential for triggering muscle contraction by binding to troponin?",
                options: ["Sodium", "Potassium", "Calcium", "Magnesium"],
                correctAnswer: 2,
                explanation: "Calcium ions bind to Troponin C, causing a conformational change that exposes the myosin-binding sites on actin."
            },
            {
                id: 2,
                question: "During muscle contraction, which band shortens?",
                options: ["A band", "I band", "Z line", "M line"],
                correctAnswer: 1,
                explanation: "The I band (containing only actin) shortens as actin filaments slide into the A band. The A band length remains constant."
            }
        ]
    },
    {
        slug: "neoplasia",
        title: "Neoplasia Basics",
        description: "Uncontrolled cell growth, benign vs malignant tumors.",
        icon: "Activity",
        year: "Year 2",
        content: {
            introduction: "Neoplasia means 'new growth'. A neoplasm is an abnormal mass of tissue, the growth of which exceeds and is uncoordinated with that of the normal tissues.",
            keyPoints: [
                "Benign: Localized, non-invasive, slow growth (e.g., Adenoma).",
                "Malignant: Invasive, metastatic potential, rapid growth (e.g., Carcinoma, Sarcoma).",
                "Metastasis is the hallmark of malignancy.",
                "Carcinogenesis involves initiation, promotion, and progression."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "What is the most definitive feature that distinguishes a malignant tumor from a benign one?",
                options: ["Rapid growth", "Metastasis", "Necrosis", "Nuclear atypia"],
                correctAnswer: 1,
                explanation: "Metastasis (spread to distant sites) is the unequivocal mark of malignancy."
            },
            {
                id: 2,
                question: "Which gene is known as the 'Guardian of the Genome'?",
                options: ["RAS", "MYC", "p53", "BCL-2"],
                correctAnswer: 2,
                explanation: "p53 (TP53) is a tumor suppressor gene that arrests the cell cycle to allow for DNA repair or induces apoptosis."
            }
        ]
    },
    {
        slug: "hemostasis",
        title: "Hemostasis",
        description: "The physiological process that stops bleeding.",
        icon: "Activity",
        year: "Year 2",
        content: {
            introduction: "Hemostasis is the process of blood clot formation at the site of vessel injury. It involves platelets, clotting factors, and endothelial cells.",
            keyPoints: [
                "Primary Hemostasis: Platelet plug formation (Adhesion, Activation, Aggregation).",
                "Secondary Hemostasis: Coagulation cascade (Intrinsic and Extrinsic pathways) leading to Fibrin clot.",
                "Fibrinolysis: Breakdown of the clot (Plasmin)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which factor initiates the Extrinsic pathway of coagulation?",
                options: ["Factor XII", "Factor VIII", "Tissue Factor (Factor III)", "Factor X"],
                correctAnswer: 2,
                explanation: "Tissue Factor (released from damaged tissue) binds to Factor VII to initiate the Extrinsic pathway."
            },
            {
                id: 2,
                question: "A deficiency of Factor VIII causes which disorder?",
                options: ["Hemophilia A", "Hemophilia B", "Von Willebrand Disease", "Vitamin K deficiency"],
                correctAnswer: 0,
                explanation: "Hemophilia A is an X-linked recessive disorder caused by a deficiency of Factor VIII."
            }
        ]
    },
    // --- YEAR 2 CONCEPTS ---
    {
        slug: "hypersensitivity",
        title: "Hypersensitivity Reactions",
        description: "Immune responses that cause tissue injury.",
        icon: "Activity",
        year: "Year 2",
        content: {
            introduction: "Hypersensitivity refers to excessive or aberrant immune responses that produce tissue injury and may cause serious disease.",
            keyPoints: [
                "Type I: Immediate (IgE-mediated, e.g., Anaphylaxis).",
                "Type II: Antibody-mediated (IgG/IgM, e.g., Goodpasture's).",
                "Type III: Immune Complex-mediated (e.g., SLE).",
                "Type IV: Cell-mediated (Delayed, e.g., TB test)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Anaphylaxis is an example of which type of hypersensitivity?",
                options: ["Type I", "Type II", "Type III", "Type IV"],
                correctAnswer: 0,
                explanation: "Anaphylaxis is a classic Type I hypersensitivity reaction mediated by IgE antibodies and mast cell degranulation."
            },
            {
                id: 2,
                question: "The Tuberculin skin test (Mantoux) is a prototype of:",
                options: ["Type I Hypersensitivity", "Type II Hypersensitivity", "Type III Hypersensitivity", "Type IV Hypersensitivity"],
                correctAnswer: 3,
                explanation: "The Mantoux test is a delayed-type (Type IV) hypersensitivity reaction mediated by T-cells."
            }
        ]
    },
    {
        slug: "shock",
        title: "Shock",
        description: "State of cellular and tissue hypoxia.",
        icon: "Activity",
        year: "Year 2",
        content: {
            introduction: "Shock is a state of circulatory failure that impairs tissue perfusion and leads to cellular hypoxia.",
            keyPoints: [
                "Hypovolemic: Loss of blood/fluid.",
                "Cardiogenic: Pump failure.",
                "Septic: Vasodilation due to infection.",
                "Anaphylactic: Systemic vasodilation.",
                "Neurogenic: Loss of sympathetic tone."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which type of shock is characterized by warm extremities in the early stage?",
                options: ["Hypovolemic", "Cardiogenic", "Septic", "Obstructive"],
                correctAnswer: 2,
                explanation: "Septic shock (distributive shock) often presents with warm skin initially due to peripheral vasodilation."
            },
            {
                id: 2,
                question: "What is the primary mechanism of Hypovolemic Shock?",
                options: ["Pump failure", "Loss of intravascular volume", "Vasodilation", "Obstruction to flow"],
                correctAnswer: 1,
                explanation: "Hypovolemic shock results from a critical decrease in blood volume (hemorrhage or dehydration)."
            }
        ]
    },
    {
        slug: "autoimmunity",
        title: "Autoimmunity",
        description: "Immune system attacking self-antigens.",
        icon: "Activity",
        year: "Year 2",
        content: {
            introduction: "Autoimmunity is a condition in which the immune system mistakenly attacks the body's own tissues.",
            keyPoints: [
                "Loss of Self-Tolerance (Central and Peripheral).",
                "Molecular Mimicry.",
                "Genetic Susceptibility (HLA alleles).",
                "Examples: SLE, Rheumatoid Arthritis, Type 1 Diabetes."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which HLA allele is strongly associated with Ankylosing Spondylitis?",
                options: ["HLA-DR4", "HLA-B27", "HLA-DQ2", "HLA-DR3"],
                correctAnswer: 1,
                explanation: "HLA-B27 has a very strong association with Ankylosing Spondylitis."
            },
            {
                id: 2,
                question: "Anti-dsDNA antibodies are highly specific for:",
                options: ["Rheumatoid Arthritis", "Systemic Lupus Erythematosus (SLE)", "Sjogren's Syndrome", "Scleroderma"],
                correctAnswer: 1,
                explanation: "Anti-dsDNA and Anti-Smith antibodies are highly specific for SLE."
            }
        ]
    },

    // --- YEAR 3 CONCEPTS ---
    {
        slug: "visual-pathway",
        title: "Visual Pathway",
        description: "Transmission of visual signals from eye to brain.",
        icon: "Activity",
        year: "Year 3",
        content: {
            introduction: "The visual pathway transmits visual information from the retina to the visual cortex in the occipital lobe.",
            keyPoints: [
                "Retina -> Optic Nerve -> Optic Chiasm (Decussation).",
                "Optic Tract -> Lateral Geniculate Body (Thalamus).",
                "Optic Radiations -> Primary Visual Cortex (Area 17)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "A lesion at the Optic Chiasm typically causes:",
                options: ["Monocular blindness", "Bitemporal hemianopsia", "Homonymous hemianopsia", "Quadrantanopia"],
                correctAnswer: 1,
                explanation: "Compression of the optic chiasm (e.g., by pituitary adenoma) affects crossing nasal fibers, leading to Bitemporal Hemianopsia."
            },
            {
                id: 2,
                question: "Where is the primary visual cortex located?",
                options: ["Frontal Lobe", "Parietal Lobe", "Temporal Lobe", "Occipital Lobe"],
                correctAnswer: 3,
                explanation: "The primary visual cortex (Brodmann area 17) is located in the Occipital Lobe."
            }
        ]
    },
    {
        slug: "refractive-errors",
        title: "Refractive Errors",
        description: "Myopia, Hypermetropia, and Astigmatism.",
        icon: "Activity",
        year: "Year 3",
        content: {
            introduction: "Refractive errors occur when the eye cannot clearly focus images on the retina.",
            keyPoints: [
                "Myopia (Nearsightedness): Image forms in front of retina. Correct with Concave lens.",
                "Hypermetropia (Farsightedness): Image forms behind retina. Correct with Convex lens.",
                "Astigmatism: Irregular curvature. Correct with Cylindrical lens.",
                "Presbyopia: Loss of accommodation with age."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which type of lens is used to correct Myopia?",
                options: ["Convex lens", "Concave lens", "Cylindrical lens", "Bifocal lens"],
                correctAnswer: 1,
                explanation: "A Concave (minus) lens diverges light rays to move the focal point back onto the retina."
            },
            {
                id: 2,
                question: "Presbyopia is due to:",
                options: ["Elongation of eyeball", "Loss of lens elasticity", "Corneal irregularity", "Cataract"],
                correctAnswer: 1,
                explanation: "Presbyopia is the age-related loss of the lens's ability to change shape (accommodate) for near vision."
            }
        ]
    },
    {
        slug: "epidemiology-triad",
        title: "Epidemiological Triad",
        description: "Agent, Host, and Environment interaction.",
        icon: "Activity",
        year: "Year 3",
        content: {
            introduction: "The epidemiological triad describes the interaction between an external agent, a susceptible host, and the environment that brings them together.",
            keyPoints: [
                "Agent: Microbe, toxin, or physical factor.",
                "Host: Genetic susceptibility, immunity, age.",
                "Environment: Climate, housing, sanitation.",
                "Vector: Often added as a 4th factor."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "In the epidemiological triad, 'Climate' is a component of:",
                options: ["Agent", "Host", "Environment", "Vector"],
                correctAnswer: 2,
                explanation: "Climate is a physical factor within the Environment."
            },
            {
                id: 2,
                question: "Which of the following is considered an 'Agent' factor?",
                options: ["Nutritional status", "Bacteria", "Housing", "Age"],
                correctAnswer: 1,
                explanation: "Bacteria is a biological agent capable of causing disease."
            }
        ]
    },
    {
        slug: "cold-chain",
        title: "Cold Chain",
        description: "System for storing and transporting vaccines.",
        icon: "Activity",
        year: "Year 3",
        content: {
            introduction: "The cold chain is a system of storing and transporting vaccines at recommended temperatures from the point of manufacture to the point of use.",
            keyPoints: [
                "OPV is most heat sensitive (requires -20°C).",
                "Hepatitis B and Tetanus Toxoid are freeze sensitive.",
                "ILR (Ice Lined Refrigerator) is used at PHC level.",
                "Vaccine Vial Monitor (VVM) indicates heat exposure."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which vaccine is most sensitive to heat?",
                options: ["BCG", "Measles", "OPV", "DPT"],
                correctAnswer: 2,
                explanation: "Oral Polio Vaccine (OPV) is the most heat-sensitive vaccine and must be stored at -20°C."
            },
            {
                id: 2,
                question: "Which equipment is used to store vaccines at the Primary Health Centre (PHC) level?",
                options: ["Walk-in Cooler", "Deep Freezer", "Ice Lined Refrigerator (ILR)", "Cold Box"],
                correctAnswer: 2,
                explanation: "The Ice Lined Refrigerator (ILR) is the primary equipment for vaccine storage at the PHC level."
            }
        ]
    },
    {
        slug: "levels-of-prevention",
        title: "Levels of Prevention",
        description: "Primordial, Primary, Secondary, and Tertiary.",
        icon: "Activity",
        year: "Year 3",
        content: {
            introduction: "Prevention in medicine is categorized into four levels based on the stage of the disease.",
            keyPoints: [
                "Primordial: Preventing risk factors (e.g., discouraging smoking in youth).",
                "Primary: Preventing disease onset (e.g., Vaccination).",
                "Secondary: Early diagnosis and treatment (e.g., Screening).",
                "Tertiary: Reducing complications/disability (e.g., Rehabilitation)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Pap smear screening for cervical cancer is an example of:",
                options: ["Primordial prevention", "Primary prevention", "Secondary prevention", "Tertiary prevention"],
                correctAnswer: 2,
                explanation: "Screening tests aim for early diagnosis and treatment, which is Secondary prevention."
            },
            {
                id: 2,
                question: "Vaccination is an example of:",
                options: ["Specific Protection", "Health Promotion", "Early Diagnosis", "Disability Limitation"],
                correctAnswer: 0,
                explanation: "Vaccination provides Specific Protection, a mode of Primary Prevention."
            }
        ]
    },
    {
        slug: "hearing-mechanism",
        title: "Mechanism of Hearing",
        description: "How sound waves are converted to neural signals.",
        icon: "Activity",
        year: "Year 3",
        content: {
            introduction: "Hearing involves the transmission of sound waves through the outer and middle ear to the cochlea, where they are converted into electrical signals.",
            keyPoints: [
                "External Ear: Collects sound.",
                "Middle Ear: Impedance matching (Ossicles).",
                "Inner Ear (Cochlea): Organ of Corti (Hair cells).",
                "Conductive vs Sensorineural Hearing Loss."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which structure is responsible for impedance matching in the ear?",
                options: ["Pinna", "Tympanic Membrane & Ossicles", "Cochlea", "Auditory Nerve"],
                correctAnswer: 1,
                explanation: "The Tympanic Membrane and Ossicular chain amplify sound pressure to match the impedance of the air with the fluid in the cochlea."
            },
            {
                id: 2,
                question: "The Organ of Corti is located in the:",
                options: ["Scala Vestibuli", "Scala Tympani", "Scala Media", "Semicircular Canals"],
                correctAnswer: 2,
                explanation: "The Organ of Corti, the sensory organ of hearing, rests on the basilar membrane within the Scala Media."
            }
        ]
    },

    // --- YEAR 4 CONCEPTS ---
    {
        slug: "glasgow-coma-scale",
        title: "Glasgow Coma Scale (GCS)",
        description: "Neurological scale to assess consciousness.",
        icon: "Activity",
        year: "Year 4",
        content: {
            introduction: "The GCS is a clinical scale used to reliably measure a person's level of consciousness after a brain injury.",
            keyPoints: [
                "Eye Opening (E): 1-4.",
                "Verbal Response (V): 1-5.",
                "Motor Response (M): 1-6.",
                "Max Score: 15, Min Score: 3.",
                "Severe Head Injury: GCS ≤ 8."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "What is the GCS score of a patient who opens eyes to pain, speaks inappropriate words, and localizes pain?",
                options: ["E2V3M5 = 10", "E2V3M4 = 9", "E3V3M5 = 11", "E2V4M5 = 11"],
                correctAnswer: 0,
                explanation: "Eyes to pain (E2), Inappropriate words (V3), Localizes pain (M5). Total = 10."
            },
            {
                id: 2,
                question: "What is the minimum possible score on the Glasgow Coma Scale?",
                options: ["0", "1", "3", "5"],
                correctAnswer: 2,
                explanation: "The lowest possible score is 3 (E1 V1 M1)."
            }
        ]
    },
    {
        slug: "wound-healing",
        title: "Wound Healing",
        description: "Process of tissue repair after injury.",
        icon: "Activity",
        year: "Year 4",
        content: {
            introduction: "Wound healing is a complex process involving hemostasis, inflammation, proliferation, and remodeling.",
            keyPoints: [
                "Primary Intention: Clean incision, minimal scarring.",
                "Secondary Intention: Open wound, granulation tissue, contraction.",
                "Phases: Inflammation -> Proliferation (Collagen III) -> Remodeling (Collagen I)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which vitamin is essential for collagen synthesis and wound healing?",
                options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"],
                correctAnswer: 1,
                explanation: "Vitamin C (Ascorbic acid) is a cofactor for the hydroxylation of proline and lysine in collagen synthesis."
            },
            {
                id: 2,
                question: "Healing by secondary intention differs from primary intention by:",
                options: ["Faster healing", "Less scarring", "Wound contraction", "Absence of inflammation"],
                correctAnswer: 2,
                explanation: "Secondary intention involves significant wound contraction by myofibroblasts and more scarring."
            }
        ]
    },
    {
        slug: "fracture-healing",
        title: "Fracture Healing",
        description: "Stages of bone repair.",
        icon: "Activity",
        year: "Year 4",
        content: {
            introduction: "Fracture healing is a proliferative physiological process that facilitates the repair of a bone fracture.",
            keyPoints: [
                "Hematoma formation.",
                "Soft Callus formation (Cartilage).",
                "Hard Callus formation (Woven bone).",
                "Remodeling (Lamellar bone)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Which is the first stage of fracture healing?",
                options: ["Remodeling", "Hematoma formation", "Soft callus", "Hard callus"],
                correctAnswer: 1,
                explanation: "Hematoma formation occurs immediately after the fracture due to bleeding from damaged vessels."
            },
            {
                id: 2,
                question: "Which type of bone is primarily formed during the hard callus stage?",
                options: ["Lamellar bone", "Woven bone", "Cortical bone", "Trabecular bone"],
                correctAnswer: 1,
                explanation: "Woven bone (immature bone) is formed first and is later remodeled into Lamellar bone."
            }
        ]
    },
    {
        slug: "normal-labor",
        title: "Normal Labor",
        description: "Stages and mechanism of labor.",
        icon: "Activity",
        year: "Year 4",
        content: {
            introduction: "Labor is the process by which the fetus and placenta are expelled from the uterus.",
            keyPoints: [
                "Stage 1: Onset of contractions to full dilation (Latent & Active).",
                "Stage 2: Full dilation to delivery of baby.",
                "Stage 3: Delivery of placenta.",
                "Stage 4: Observation (1-2 hours)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "The second stage of labor ends with:",
                options: ["Full cervical dilation", "Delivery of the baby", "Delivery of the placenta", "Engagement of the head"],
                correctAnswer: 1,
                explanation: "The second stage begins with full cervical dilation and ends with the delivery of the baby."
            },
            {
                id: 2,
                question: "Active management of the third stage of labor (AMTSL) includes all EXCEPT:",
                options: ["Uterine massage", "Controlled cord traction", "Oxytocin injection", "Fundal pressure"],
                correctAnswer: 3,
                explanation: "Fundal pressure is contraindicated as it can cause uterine inversion. AMTSL includes Oxytocin, CCT, and Uterine massage."
            }
        ]
    },
    {
        slug: "menstrual-cycle",
        title: "Menstrual Cycle",
        description: "Hormonal and physiological changes.",
        icon: "Activity",
        year: "Year 4",
        content: {
            introduction: "The menstrual cycle is controlled by the HPO axis and involves changes in the ovary and endometrium.",
            keyPoints: [
                "Follicular Phase (Estrogen dominant).",
                "Ovulation (LH Surge).",
                "Luteal Phase (Progesterone dominant).",
                "Menstruation (Withdrawal of Progesterone)."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Ovulation typically occurs how many hours after the LH surge?",
                options: ["10-12 hours", "24-36 hours", "48-72 hours", "1 week"],
                correctAnswer: 1,
                explanation: "Ovulation usually occurs 24-36 hours after the onset of the LH surge."
            },
            {
                id: 2,
                question: "Which hormone is primarily responsible for the secretory phase of the endometrium?",
                options: ["Estrogen", "Progesterone", "FSH", "LH"],
                correctAnswer: 1,
                explanation: "Progesterone, secreted by the corpus luteum, prepares the endometrium for implantation (Secretory phase)."
            }
        ]
    },
    {
        slug: "ecg-basics",
        title: "ECG Basics",
        description: "Interpretation of the electrocardiogram.",
        icon: "Activity",
        year: "Year 4",
        content: {
            introduction: "An electrocardiogram (ECG) records the electrical activity of the heart.",
            keyPoints: [
                "P wave: Atrial depolarization.",
                "QRS complex: Ventricular depolarization.",
                "T wave: Ventricular repolarization.",
                "PR interval: AV node delay.",
                "ST segment: Isoelectric period."
            ]
        },
        mcqs: [
            {
                id: 1,
                question: "Atrial depolarization is represented on the ECG by the:",
                options: ["P wave", "QRS complex", "T wave", "U wave"],
                correctAnswer: 0,
                explanation: "The P wave represents atrial depolarization."
            },
            {
                id: 2,
                question: "A prolonged PR interval (>0.20 sec) indicates:",
                options: ["First-degree AV block", "Right Bundle Branch Block", "Left Ventricular Hypertrophy", "Myocardial Infarction"],
                correctAnswer: 0,
                explanation: "A fixed prolonged PR interval indicates First-degree AV block."
            }
        ]
    }
];
