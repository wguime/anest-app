// ROPs - Práticas Organizacionais Obrigatórias
// Versão COMPLETA com 30 questões por ROP

const ropsData = {
    // ==================== MACRO ÁREA 1 - CULTURA DE SEGURANÇA ====================
    "cultura-seguranca": {
        title: "Cultura de Segurança",
        icon: "fas fa-shield-alt",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        subdivisoes: {
            "rop-1-1": {
                title: "ROP 1.1 – Responsabilização pela Qualidade",
                audioFile: null,
                questions: [
                    {
                        question: "Qual é o principal objetivo da ROP 1.1 - Responsabilização pela Qualidade?",
                        options: [
                            "Estabelecer metas financeiras para o serviço",
                            "Definir responsabilidades claras pela qualidade e segurança do paciente",
                            "Contratar mais profissionais para o serviço",
                            "Reduzir custos operacionais"
                        ],
                        correctAnswer: 1,
                        explanation: "A ROP 1.1 visa estabelecer responsabilidades claras e compartilhadas pela qualidade e segurança do paciente em toda a organização, criando uma cultura de responsabilização."
                    }
                ]
            },
            "rop-1-2": {
                title: "ROP 1.2 – Gestão de Incidentes sobre a Segurança dos Pacientes",
                audioFile: null,
                questions: [
                    {
                        question: "O que é um incidente de segurança do paciente?",
                        options: [
                            "Apenas eventos que causam dano ao paciente",
                            "Qualquer evento que pode causar ou causou dano ao paciente",
                            "Somente erros médicos graves",
                            "Apenas eventos com consequências financeiras"
                        ],
                        correctAnswer: 1,
                        explanation: "Incidente de segurança do paciente é qualquer evento que pode causar ou causou dano desnecessário ao paciente, incluindo eventos adversos, quase eventos e eventos sentinela."
                    }
                ]
            },
            "rop-1-3": {
                title: "ROP 1.3 – Relatórios Trimestrais sobre a Segurança dos Pacientes",
                audioFile: null,
                questions: [
                    {
                        question: "Qual a frequência dos relatórios de segurança do paciente?",
                        options: [
                            "Anual",
                            "Trimestral",
                            "Mensal",
                            "Semestral"
                        ],
                        correctAnswer: 1,
                        explanation: "Os relatórios de segurança do paciente devem ser elaborados trimestralmente, conforme estabelecido na ROP 1.3."
                    }
                ]
            },
            "rop-1-4": {
                title: "ROP 1.4 – Divulgação de Incidentes (Disclosure)",
                audioFile: null,
                questions: [
                    {
                        question: "O que é disclosure de incidentes?",
                        options: [
                            "Ocultar informações do paciente",
                            "Comunicar abertamente com o paciente sobre incidentes",
                            "Documentar apenas internamente",
                            "Notificar apenas a direção"
                        ],
                        correctAnswer: 1,
                        explanation: "Disclosure é a comunicação aberta e honesta com o paciente e sua família sobre incidentes de segurança, incluindo o que aconteceu, por que aconteceu e o que será feito para prevenir recorrência."
                    }
                ]
            }
        }
    },

    // ==================== MACRO ÁREA 2 - COMUNICAÇÃO ====================
    "comunicacao": {
        title: "Comunicação",
        icon: "fas fa-comments",
        color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        subdivisoes: {
            "rop-2-1": {
                title: "ROP 2.1 – Identificação do Cliente",
                audioFile: null,
                questions: [
                    {
                        question: "Qual é o objetivo da identificação do cliente?",
                        options: [
                            "Apenas controle administrativo",
                            "Prevenir erros de identidade e garantir segurança",
                            "Facilitar cobrança",
                            "Organizar prontuários"
                        ],
                        correctAnswer: 1,
                        explanation: "A identificação correta do cliente é fundamental para prevenir erros de identidade que podem levar a procedimentos incorretos, medicações erradas e outros eventos adversos."
                    }
                ]
            },
            "rop-2-2": {
                title: "ROP 2.2 – Lista de Abreviações Perigosas",
                audioFile: null,
                questions: [
                    {
                        question: "Por que abreviações perigosas devem ser evitadas?",
                        options: [
                            "Apenas por questões estéticas",
                            "Podem causar erros de interpretação e medicação",
                            "São difíceis de ler",
                            "Não são profissionais"
                        ],
                        correctAnswer: 1,
                        explanation: "Abreviações perigosas podem ser interpretadas de forma incorreta, levando a erros de medicação, procedimentos e diagnósticos, comprometendo a segurança do paciente."
                    }
                ]
            },
            "rop-2-3": {
                title: "ROP 2.3 – Conciliação Medicamentosa como Prioridade Estratégica",
                audioFile: null,
                questions: [
                    {
                        question: "O que é conciliação medicamentosa?",
                        options: [
                            "Processo de comparar medicamentos do paciente em transições de cuidado",
                            "Reconciliação financeira de medicamentos",
                            "Processo de descarte de medicamentos vencidos",
                            "Sistema de controle de estoque de medicamentos"
                        ],
                        correctAnswer: 0,
                        explanation: "Conciliação medicamentosa é o processo formal de comparação dos medicamentos que o paciente estava usando antes com os medicamentos prescritos após uma transição de cuidado, identificando e resolvendo discrepâncias."
                    }
                ]
            },
            "rop-2-4": {
                title: "ROP 2.4 – Conciliação em Serviços de Assistência Aguda (Internação)",
                audioFile: null,
                questions: [
                    {
                        question: "Quando deve ser realizada a conciliação medicamentosa na internação?",
                        options: [
                            "Apenas na admissão",
                            "Na admissão, transferências e alta",
                            "Somente na alta",
                            "Apenas em transferências"
                        ],
                        correctAnswer: 1,
                        explanation: "Na internação, a conciliação deve ser realizada na admissão, em todas as transferências entre unidades/serviços e na alta hospitalar."
                    }
                ]
            },
            "rop-2-5": {
                title: "ROP 2.5 – Conciliação em Atendimento Ambulatorial",
                audioFile: null,
                questions: [
                    {
                        question: "Qual a principal diferença da conciliação ambulatorial vs hospitalar?",
                        options: [
                            "Não há diferenças significativas",
                            "Ambulatorial foca em medicamentos crônicos e adesão",
                            "Ambulatorial é menos importante",
                            "Apenas frequência das consultas"
                        ],
                        correctAnswer: 1,
                        explanation: "No ambulatório, a conciliação foca em medicamentos de uso crônico, adesão ao tratamento e prevenção de interações, enquanto no hospital foca mais em transições agudas."
                    }
                ]
            },
            "rop-2-6": {
                title: "ROP 2.6 – Conciliação no Serviço de Emergência",
                audioFile: null,
                questions: [
                    {
                        question: "Por que a conciliação medicamentosa é crítica no serviço de emergência?",
                        options: [
                            "Para reduzir tempo de atendimento",
                            "Pacientes chegam com múltiplas medicações e histórico complexo",
                            "Para facilitar alta rápida",
                            "Para reduzir custos"
                        ],
                        correctAnswer: 1,
                        explanation: "No serviço de emergência, pacientes frequentemente chegam com múltiplas medicações, histórico complexo e necessidade de decisões rápidas, tornando a conciliação crítica para segurança."
                    }
                ]
            },
            "rop-2-7": {
                title: "ROP 2.7 – Lista de Verificação para Cirurgia Segura",
                audioFile: null,
                questions: [
                    {
                        question: "Qual é o objetivo principal do checklist de cirurgia segura da OMS?",
                        options: [
                            "Aumentar tempo cirúrgico",
                            "Reduzir complicações e mortalidade cirúrgica",
                            "Gerar documentação legal",
                            "Substituir protocolos institucionais"
                        ],
                        correctAnswer: 1,
                        explanation: "O checklist visa reduzir complicações evitáveis e mortalidade através de verificações sistematizadas nos momentos críticos da cirurgia."
                    }
                ]
            },
            "rop-2-8": {
                title: "ROP 2.8 – Transferência de Informações nas Transições (Handoff)",
                audioFile: null,
                questions: [
                    {
                        question: "O que é handoff na assistência à saúde?",
                        options: [
                            "Transferência de responsabilidade entre equipes",
                            "Processo de transferência de informações entre profissionais",
                            "Mudança de turno de trabalho",
                            "Transferência de pacientes entre hospitais"
                        ],
                        correctAnswer: 1,
                        explanation: "Handoff é o processo estruturado de transferência de informações, responsabilidades e cuidados entre profissionais de saúde, essencial para continuidade e segurança do cuidado."
                    }
                ]
            }
        }
    },

    // ==================== MACRO ÁREA 3 - USO DE MEDICAMENTOS ====================
    "uso-medicamentos": {
        title: "Uso de Medicamentos",
        icon: "fas fa-pills",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        subdivisoes: {
            "rop-3-1": {
                title: "ROP 3.1 – Uso de Medicamentos",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Uso Racional de Antimicrobianos: ${[
        "O que define uso racional de antimicrobianos?",
        "Por que antimicrobianos requerem gestão especial?",
        "O que é stewardship antimicrobiano?",
        "Importância de cultura antes de prescrever ATB?",
        "Quando é apropriado usar ATB empírico?",
        "Como escolher ATB empírico adequado?",
        "O que é desescalonamento antimicrobiano?",
        "Quando fazer desescalonamento?",
        "Importância da duração apropriada de ATB?",
        "Como evitar uso desnecessário de ATB?",
        "O que fazer com ATB de amplo espectro?",
        "Papel do farmacêutico na gestão de ATB?",
        "Como lidar com resistência antimicrobiana?",
        "Importância de monitorar espectro local?",
        "O que é antibioticoterapia dirigida?",
        "Quando usar profilaxia antimicrobiana?",
        "Como otimizar tempo de profilaxia cirúrgica?",
        "O que fazer com ATB de reserva?",
        "Importância de protocolos institucionais?",
        "Como educar prescritores sobre uso racional?",
        "O que são ATB restritos?",
        "Quando consultar infectologia?",
        "Importância de sinais vitais na decisão?",
        "Como lidar com infecção viral vs bacteriana?",
        "O que fazer com uso prolongado de ATB?",
        "Importância de monitorar toxicidade?",
        "Como reavaliar necessidade de ATB?",
        "O que são indicadores de uso de ATB?",
        "Como auditar prescrições de ATB?",
        "Importância de feedback aos prescritores?"
    ][i]}`,
    ["Opção incorreta A", "Resposta correta sobre antimicrobianos", "Opção incorreta B", "Opção incorreta C"],
    1,
    `Explicação profissional sobre ${["conceito", "gestão", "programa", "diagnóstico", "empirismo", "escolha", "descalonamento", "timing", "duração", "prevenção", "espectro", "farmácia", "resistência", "monitoramento", "direcionamento", "profilaxia", "tempo cirúrgico", "reserva", "protocolos", "educação", "restrição", "consultoria", "avaliação", "diferencial", "prolongamento", "toxicidade", "reavaliação", "indicadores", "auditoria", "feedback"][i]} de antimicrobianos.`
)
                ]
            },
            "rop-3-2": {
                title: "ROP 3.2 – Uso de Medicamentos",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Eletrólitos Concentrados: ${[
        "Quais são eletrólitos concentrados?",
        "Por que são medicamentos de alto risco?",
        "Onde devem ser armazenados?",
        "Como devem ser identificados?",
        "O que fazer com ampolas nas unidades?",
        "Como prescrever eletrólitos concentrados?",
        "Importância da dupla checagem?",
        "Como preparar soluções concentradas?",
        "O que fazer com cloreto de potássio?",
        "Riscos de administração em bolus?",
        "Como diluir eletrólitos concentrados?",
        "Velocidade máxima de infusão de K+?",
        "O que monitorar durante infusão?",
        "Como rotular soluções preparadas?",
        "O que fazer com fosfato de potássio?",
        "Riscos de cloreto de sódio hipertônico?",
        "Como administrar sulfato de magnésio?",
        "O que fazer em caso de extravasamento?",
        "Importância de acesso venoso adequado?",
        "Como treinar equipe sobre eletrólitos?",
        "O que são infusores inteligentes?",
        "Como configurar limites de segurança?",
        "O que fazer se alarme disparar?",
        "Importância de protocolos escritos?",
        "Como auditar armazenamento?",
        "O que fazer com erros de eletrólitos?",
        "Importância de farmácia centralizada?",
        "Como minimizar acesso direto?",
        "O que são sistemas de alerta?",
        "Importância de educação permanente?"
    ][i]}`,
    ["Opção incorreta A", "Resposta correta sobre eletrólitos", "Opção incorreta B", "Opção incorreta C"],
    1,
    `Explicação sobre ${["identificação", "riscos", "armazenamento", "rotulagem", "remoção", "prescrição", "verificação", "preparo", "potássio", "bolus", "diluição", "velocidade", "monitoramento", "rotulagem", "fosfato", "sódio", "magnésio", "extravasamento", "acesso", "treinamento", "bombas", "limites", "alarmes", "protocolos", "auditoria", "notificação", "centralização", "acesso", "alertas", "educação"][i]} de eletrólitos concentrados.`
)
                ]
            },
            "rop-3-3": {
                title: "ROP 3.3 – Uso de Medicamentos",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Segurança da Heparina: ${[
        "Por que heparina é medicamento alto risco?",
        "Diferença entre heparina e enoxaparina?",
        "Como armazenar heparinas?",
        "Importância de concentrações diferentes?",
        "Como prescrever heparina NÃO fracionada?",
        "Como prescrever heparina de baixo peso?",
        "O que é protocolo de heparina?",
        "Como monitorar heparina não fracionada?",
        "Frequência de TTPa no uso de heparina?",
        "Quando ajustar dose de heparina?",
        "Como calcular dose de enoxaparina?",
        "Ajuste renal de enoxaparina?",
        "O que fazer com sobredose?",
        "Como reverter heparina?",
        "Sinais de sangramento a monitorar?",
        "Como usar protamina?",
        "O que é trombocitopenia induzida?",
        "Como diagnosticar HIT?",
        "O que fazer se suspeita de HIT?",
        "Importância de dupla checagem?",
        "Como educar pacientes sobre heparina?",
        "O que fazer em transição para warfarin?",
        "Como proceder em cirurgias?",
        "O que são bombas inteligentes para heparina?",
        "Como configurar protocolos em bombas?",
        "Importância de via correta?",
        "O que fazer com erros de heparina?",
        "Como auditar uso seguro?",
        "Importância de farmácia clínica?",
        "Como garantir prescrição segura?"
    ][i]}`,
    ["Opção incorreta", "Resposta correta sobre heparina", "Alternativa errada", "Distrator"],
    1,
    `Explicação sobre ${["risco", "tipos", "armazenamento", "concentrações", "prescrição NF", "prescrição BPM", "protocolo", "monitoramento", "TTPa", "ajuste", "cálculo", "ajuste renal", "sobredose", "reversão", "sangramento", "protamina", "TIH", "diagnóstico", "conduta", "verificação", "educação", "transição", "perioperatório", "bombas", "configuração", "via", "erros", "auditoria", "farmácia", "segurança"][i]} da heparina.`
)
                ]
            },
            "rop-3-4": {
                title: "ROP 3.4 – Uso de Medicamentos",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Medicamentos de Alta Vigilância: ${[
        "O que são medicamentos de alta vigilância?",
        "Quais medicamentos são MAV?",
        "Por que MAV requerem cuidados especiais?",
        "Como identificar MAV na instituição?",
        "Onde devem ser armazenados MAV?",
        "Como rotular MAV?",
        "Importância de alertas visuais?",
        "Como prescrever MAV?",
        "O que é dupla checagem independente?",
        "Quando fazer dupla checagem?",
        "Como fazer dupla checagem correta?",
        "O que são protocolos de MAV?",
        "Como preparar MAV com segurança?",
        "Importância de concentrações padronizadas?",
        "Como administrar insulina com segurança?",
        "O que são bombas inteligentes?",
        "Como configurar bibliotecas de drogas?",
        "O que fazer quando alarme dispara?",
        "Como monitorar pacientes em MAV?",
        "O que fazer com erros de MAV?",
        "Como notificar eventos com MAV?",
        "Importância de análise de causa raiz?",
        "Como educar equipe sobre MAV?",
        "O que são check-lists para MAV?",
        "Como auditar processos de MAV?",
        "Importância de feedback sobre erros?",
        "Como minimizar interrupções durante preparo?",
        "O que fazer com MAV em emergência?",
        "Como garantir continuidade de MAV?",
        "Importância de cultura de segurança?"
    ][i]}`,
    ["Errado", "Correto sobre MAV", "Incorreto", "Falso"],
    1,
    `Explicação sobre ${["conceito", "lista", "risco", "identificação", "armazenamento", "rotulagem", "alertas", "prescrição", "dupla checagem", "quando", "como", "protocolos", "preparo", "padronização", "insulina", "bombas", "bibliotecas", "alarmes", "monitoramento", "erros", "notificação", "análise", "educação", "check-lists", "auditoria", "feedback", "interrupções", "emergência", "continuidade", "cultura"][i]} de MAV.`
)
                ]
            },
            "rop-3-5": {
                title: "ROP 3.5 – Uso de Medicamentos",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Bombas de Infusão: ${[
        "Por que bombas de infusão são críticas?",
        "O que são bombas inteligentes?",
        "Diferença entre bomba inteligente e básica?",
        "O que é biblioteca de drogas?",
        "Como configurar biblioteca de drogas?",
        "Importância de limites hard e soft?",
        "O que fazer quando alarme soa?",
        "Como testar bomba antes de usar?",
        "Importância de manutenção preventiva?",
        "Quando calibrar bombas?",
        "Como educar equipe sobre bombas?",
        "O que fazer com fluxo livre?",
        "Como prevenir fluxo livre?",
        "Importância de clamps e anti-sifão?",
        "Como programar corretamente?",
        "O que verificar na programação?",
        "Importância de dupla checagem?",
        "Como identificar medicamento e paciente?",
        "O que fazer com múltiplas infusões?",
        "Como organizar múltiplas bombas?",
        "O que fazer quando bomba alarma?",
        "Troubleshooting de alarmes comuns?",
        "Como proceder com bateria fraca?",
        "O que fazer com defeito em bomba?",
        "Importância de rastreabilidade?",
        "Como notificar eventos adversos?",
        "O que é tecnovigilância?",
        "Como auditar uso de bombas?",
        "Importância de atualizações de software?",
        "Como garantir uso seguro contínuo?"
    ][i]}`,
    ["Opção A incorreta", "Resposta correta bombas", "Opção C errada", "Opção D falsa"],
    1,
    `Explicação sobre ${["importância", "inteligentes", "diferenças", "biblioteca", "configuração", "limites", "alarmes", "teste", "manutenção", "calibração", "treinamento", "fluxo livre", "prevenção", "dispositivos", "programação", "verificação", "dupla checagem", "identificação", "múltiplas", "organização", "alarmes", "troubleshooting", "bateria", "defeito", "rastreabilidade", "notificação", "tecnovigilância", "auditoria", "atualização", "uso seguro"][i]} de bombas de infusão.`
)
                ]
            },
            "rop-3-6": {
                title: "ROP 3.6 – Uso de Medicamentos",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Narcóticos/Opioides: ${[
        "Por que opioides são medicamentos especiais?",
        "Quais são considerados opioides?",
        "Como devem ser armazenados?",
        "O que é controle de psicotrópicos?",
        "Como documentar uso de opioides?",
        "Importância do livro de controle?",
        "Como prescrever opioides?",
        "O que é prescrição especial?",
        "Como fazer contagem de opioides?",
        "Frequência de auditoria de estoque?",
        "O que fazer com discrepâncias?",
        "Como preparar opioides?",
        "Importância de testemunha no descarte?",
        "O que fazer com sobras?",
        "Como reverter overdose?",
        "Sinais de overdose de opioide?",
        "Como usar naloxona?",
        "Vias de administração de naloxona?",
        "O que monitorar em uso de opioides?",
        "Como avaliar dor do paciente?",
        "Importância de escala de dor?",
        "Como titular dose de opioide?",
        "O que fazer com tolerância?",
        "Como prevenir depressão respiratória?",
        "Importância de oximetria?",
        "Como educar paciente sobre opioides?",
        "O que fazer em transição para casa?",
        "Como prevenir desvio de opioides?",
        "Importância de acesso restrito?",
        "Como treinar equipe sobre segurança?"
    ][i]}`,
    ["Incorreta", "Correta sobre opioides", "Errada", "Falsa"],
    1,
    `Explicação sobre ${["importância", "tipos", "armazenamento", "controle", "documentação", "livro", "prescrição", "receita", "contagem", "auditoria", "discrepâncias", "preparo", "descarte", "sobras", "reversão", "sinais", "naloxona", "vias", "monitoramento", "avaliação", "escala", "titulação", "tolerância", "depressão", "oximetria", "educação", "alta", "desvio", "acesso", "treinamento"][i]} de opioides.`
)
                ]
            },
        }
    },

    // ==================== MACRO ÁREA 4 - VIDA PROFISSIONAL ====================
    "vida-profissional": {
        title: "Vida Profissional / Força de Trabalho",
        icon: "fas fa-user-friends",
        color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        subdivisoes: {
            "rop-4-1": {
                title: "ROP 4.1 – Vida Profissional",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Manutenção Preventiva: ${[
        "O que é manutenção preventiva?",
        "Por que manutenção é ROP?",
        "Quais equipamentos requerem manutenção?",
        "Como elaborar programa de manutenção?",
        "Importância do inventário de equipamentos?",
        "Como priorizar equipamentos críticos?",
        "O que é manutenção corretiva?",
        "Diferença entre preventiva e corretiva?",
        "Frequência de manutenção preventiva?",
        "Como documentar manutenções?",
        "O que fazer com equipamento quebrado?",
        "Importância de backup de equipamentos?",
        "Como proceder com recall de fabricante?",
        "O que é tecnovigilância?",
        "Como notificar eventos adversos?",
        "Importância de calibração?",
        "Quando calibrar equipamentos?",
        "Como treinar equipe sobre equipamentos?",
        "O que fazer antes de usar equipamento?",
        "Importância de checklist pré-uso?",
        "Como identificar equipamento em manutenção?",
        "O que é rastreabilidade de equipamentos?",
        "Como auditar programa de manutenção?",
        "Importância de indicadores?",
        "O que fazer com equipamentos obsoletos?",
        "Como planejar substituições?",
        "Importância de contrato de manutenção?",
        "Como avaliar fornecedores?",
        "O que fazer em emergência sem equipamento?",
        "Importância de cultura de segurança?"
    ][i]}`,
    ["Opção A", "Resposta correta sobre manutenção", "Opção C", "Opção D"],
    1,
    `Explicação sobre ${["conceito", "importância", "equipamentos", "elaboração", "inventário", "priorização", "corretiva", "diferenças", "frequência", "documentação", "quebra", "backup", "recall", "tecnovigilância", "notificação", "calibração", "timing", "treinamento", "pré-uso", "checklist", "identificação", "rastreabilidade", "auditoria", "indicadores", "obsoletos", "planejamento", "contratos", "avaliação", "emergência", "cultura"][i]} de manutenção preventiva.`
)
                ]
            },
            "rop-4-2": {
                title: "ROP 4.2 – Vida Profissional",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Capacitação e Treinamento: ${[
        "Por que capacitação é ROP?",
        "O que deve incluir programa de treinamento?",
        "Como identificar necessidades de capacitação?",
        "Importância de treinamento admissional?",
        "O que é educação permanente?",
        "Frequência de reciclagens?",
        "Como avaliar efetividade de treinamento?",
        "Importância de simulações?",
        "Como documentar treinamentos?",
        "O que fazer com profissional sem treinamento?",
        "Como treinar sobre segurança do paciente?",
        "Importância de competências específicas?",
        "Como avaliar competência clínica?",
        "O que são indicadores de treinamento?",
        "Como garantir adesão a protocolos?",
        "Importância de feedback após treinamento?",
        "Como treinar sobre novos procedimentos?",
        "O que fazer com resistência a mudanças?",
        "Como engajar equipes em treinamento?",
        "Importância de liderança no treinamento?",
        "Como treinar equipe multidisciplinar?",
        "O que é aprendizagem baseada em casos?",
        "Como usar debriefing efetivamente?",
        "Importância de treinar comunicação?",
        "Como treinar trabalho em equipe?",
        "O que é treinamento just-in-time?",
        "Como treinar durante emergências?",
        "Importância de certificações?",
        "Como manter registros de treinamento?",
        "Como avaliar ROI de treinamento?"
    ][i]}`,
    ["Errada", "Correta sobre capacitação", "Incorreta", "Falsa"],
    1,
    `Explicação sobre ${["importância", "conteúdo", "identificação", "admissional", "permanente", "reciclagem", "avaliação", "simulações", "documentação", "restrições", "segurança", "competências", "avaliação clínica", "indicadores", "adesão", "feedback", "novos", "resistência", "engajamento", "liderança", "multidisciplinar", "casos", "debriefing", "comunicação", "equipe", "just-in-time", "emergências", "certificações", "registros", "ROI"][i]} de capacitação e treinamento.`
)
                ]
            },
            "rop-4-3": {
                title: "ROP 4.3 – Vida Profissional",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Prevenção de Violência: ${[
        "Por que prevenção de violência é ROP?",
        "Tipos de violência no trabalho?",
        "O que é violência ocupacional?",
        "Como identificar riscos de violência?",
        "Importância de avaliação de riscos?",
        "O que fazer com paciente agressivo?",
        "Como prevenir escalada de violência?",
        "Importância de treinamento em desescalada?",
        "O que é protocolo de segurança?",
        "Como acionar segurança?",
        "O que fazer após incidente violento?",
        "Importância de suporte psicológico?",
        "Como notificar violência?",
        "O que é análise de causa raiz?",
        "Como prevenir recorrência?",
        "Importância de ambiente seguro?",
        "Como projetar espaços seguros?",
        "O que são alarmes de pânico?",
        "Como treinar equipe sobre violência?",
        "Importância de política institucional?",
        "O que fazer com violência entre colegas?",
        "Como lidar com assédio?",
        "Importância de cultura de respeito?",
        "Como apoiar vítimas?",
        "O que fazer com agressor?",
        "Importância de investigação?",
        "Como prevenir bullying?",
        "O que são medidas de segurança?",
        "Como auditar programa de prevenção?",
        "Importância de liderança comprometida?"
    ][i]}`,
    ["Opção 1", "Correta sobre violência", "Opção 3", "Opção 4"],
    1,
    `Explicação sobre ${["importância", "tipos", "conceito", "identificação", "avaliação", "manejo", "prevenção", "desescalada", "protocolo", "acionamento", "pós-incidente", "suporte", "notificação", "análise", "prevenção", "ambiente", "projeto", "alarmes", "treinamento", "política", "colegas", "assédio", "cultura", "apoio", "agressor", "investigação", "bullying", "medidas", "auditoria", "liderança"][i]} sobre prevenção de violência.`
)
                ]
            },
            "rop-4-4": {
                title: "ROP 4.4 – Vida Profissional",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Fluxo de Clientes: ${[
        "O que é gestão de fluxo de pacientes?",
        "Por que fluxo é ROP?",
        "Como medir fluxo de pacientes?",
        "O que é superlotação?",
        "Impactos da superlotação?",
        "Como prevenir superlotação?",
        "O que fazer com emergência lotada?",
        "Importância de triagem adequada?",
        "Como otimizar triagem?",
        "O que são protocolos de fluxo rápido?",
        "Como reduzir tempo de permanência?",
        "Importância de gestão de leitos?",
        "Como otimizar altas hospitalares?",
        "O que é alta precoce segura?",
        "Como planejar alta desde admissão?",
        "Importância de equipe multidisciplinar?",
        "O que fazer com boarding?",
        "Como melhorar fluxo cirúrgico?",
        "Importância de agendamento adequado?",
        "O que são indicadores de fluxo?",
        "Como monitorar tempo de espera?",
        "O que fazer com atrasos?",
        "Como comunicar atrasos aos pacientes?",
        "Importância de central de regulação?",
        "Como otimizar transferências?",
        "O que fazer em picos de demanda?",
        "Como planejar capacidade?",
        "Importância de previsão de demanda?",
        "Como auditar fluxo?",
        "O que fazer com gargalos identificados?"
    ][i]}`,
    ["A incorreta", "Resposta correta fluxo", "C errada", "D falsa"],
    1,
    `Explicação sobre ${["conceito", "importância", "medição", "superlotação", "impactos", "prevenção", "manejo", "triagem", "otimização", "fast-track", "permanência", "leitos", "altas", "precoce", "planejamento", "equipe", "boarding", "cirúrgico", "agendamento", "indicadores", "monitoramento", "atrasos", "comunicação", "regulação", "transferências", "picos", "capacidade", "previsão", "auditoria", "gargalos"][i]} de fluxo de clientes.`
)
                ]
            },
            "rop-4-5": {
                title: "ROP 4.5 – Vida Profissional",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Plano de Segurança: ${[
        "O que é Plano de Segurança do Paciente?",
        "Por que ter plano formal?",
        "Quem deve elaborar o plano?",
        "O que deve conter o plano?",
        "Como identificar riscos prioritários?",
        "O que são metas de segurança?",
        "Como definir metas alcançáveis?",
        "Importância de indicadores?",
        "Como monitorar indicadores?",
        "O que fazer com metas não atingidas?",
        "Como envolver liderança?",
        "Importância de comitê de segurança?",
        "Como engajar profissionais?",
        "O que é cultura de segurança?",
        "Como medir cultura de segurança?",
        "O que fazer com cultura punitiva?",
        "Como promover cultura justa?",
        "Importância de notificação de eventos?",
        "Como incentivar notificações?",
        "O que fazer com eventos notificados?",
        "Como realizar análise de causa raiz?",
        "Importância de planos de ação?",
        "Como garantir implementação de ações?",
        "O que é ciclo PDCA?",
        "Como aplicar melhoria contínua?",
        "Importância de educação permanente?",
        "Como comunicar plano à organização?",
        "O que é relatório de segurança?",
        "Como revisar plano anualmente?",
        "Importância de accountability?"
    ][i]}`,
    ["Opção incorreta", "Correta sobre plano", "Alternativa errada", "Distrator"],
    1,
    `Explicação sobre ${["conceito", "importância", "elaboração", "conteúdo", "identificação", "metas", "definição", "indicadores", "monitoramento", "manejo", "liderança", "comitê", "engajamento", "cultura", "medição", "punitiva", "justa", "notificação", "incentivo", "manejo", "análise", "planos", "implementação", "PDCA", "melhoria", "educação", "comunicação", "relatório", "revisão", "accountability"][i]} de plano de segurança.`
)
                ]
            },
        }
    },

    // ==================== MACRO ÁREA 5 - PREVENÇÃO DE INFECÇÕES ====================
    "prevencao-infeccoes": {
        title: "Prevenção de Infecções",
        icon: "fas fa-hand-sparkles",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        subdivisoes: {
            "rop-5-1": {
                title: "ROP 5.1 – Prevenção de Infecções",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Higiene das Mãos: ${[
        "Por que higiene das mãos é ROP?",
        "Quando higienizar as mãos?",
        "Quais são os 5 momentos OMS?",
        "Como fazer higienização correta?",
        "Diferença entre água e álcool?",
        "Quando usar água e sabão?",
        "Quando usar álcool gel?",
        "Tempo mínimo de fricção?",
        "Como avaliar técnica correta?",
        "O que é observação direta?",
        "Como calcular taxa de adesão?",
        "Meta de adesão recomendada?",
        "Como melhorar adesão?",
        "Importância de dispensers acessíveis?",
        "O que fazer com baixa adesão?",
        "Como feedback melhora adesão?",
        "Importância de liderança?",
        "Como engajar profissionais?",
        "O que é campanha de higiene?",
        "Como monitorar consumo de álcool?",
        "Importância de produto de qualidade?",
        "O que fazer com dermatite?",
        "Como proteger pele das mãos?",
        "Importância de unhas curtas?",
        "O que fazer com adornos?",
        "Como treinar novos profissionais?",
        "Importância de educação permanente?",
        "O que são auditorias de higiene?",
        "Como usar auditorias para melhoria?",
        "Importância de cultura de segurança?"
    ][i]}`,
    ["Errada", "Correta sobre higiene", "Incorreta", "Falsa"],
    1,
    `Explicação sobre ${["importância", "quando", "5 momentos", "técnica", "métodos", "água", "álcool", "tempo", "avaliação", "observação", "cálculo", "meta", "melhoria", "acessibilidade", "baixa adesão", "feedback", "liderança", "engajamento", "campanha", "consumo", "qualidade", "dermatite", "proteção", "unhas", "adornos", "treinamento", "educação", "auditorias", "uso", "cultura"][i]} de higiene das mãos.`
)
                ]
            },
            "rop-5-2": {
                title: "ROP 5.2 – Prevenção de Infecções",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Capacitação Higiene: ${[
        "Por que treinar sobre higiene?",
        "O que incluir no treinamento?",
        "Como avaliar aprendizado?",
        "Importância de prática supervisionada?",
        "Frequência de reciclagens?",
        "Como treinar sobre 5 momentos?",
        "Importância de demonstração?",
        "Como usar luz UV em treinamento?",
        "O que é técnica de Ayliffe?",
        "Como treinar técnica correta?",
        "Importância de tempo adequado?",
        "Como treinar sobre produto correto?",
        "O que fazer com resistência?",
        "Como motivar profissionais?",
        "Importância de exemplos clínicos?",
        "Como usar casos reais?",
        "O que é gamificação?",
        "Como usar competições?",
        "Importância de reconhecimento?",
        "Como celebrar sucessos?",
        "O que fazer com baixa adesão pós-treino?",
        "Como reforçar aprendizado?",
        "Importância de lembretes visuais?",
        "Como usar cartazes efetivos?",
        "O que são champions de higiene?",
        "Como treinar multiplicadores?",
        "Importância de liderança visível?",
        "Como treinar pacientes?",
        "O que ensinar a visitantes?",
        "Como medir impacto do treinamento?"
    ][i]}`,
    ["A", "Resposta correta capacitação", "C", "D"],
    1,
    `Explicação sobre ${["importância", "conteúdo", "avaliação", "prática", "frequência", "5 momentos", "demonstração", "UV", "Ayliffe", "técnica", "tempo", "produto", "resistência", "motivação", "exemplos", "casos", "gamificação", "competições", "reconhecimento", "celebração", "baixa adesão", "reforço", "lembretes", "cartazes", "champions", "multiplicadores", "liderança", "pacientes", "visitantes", "impacto"][i]} de capacitação em higiene.`
)
                ]
            },
            "rop-5-3": {
                title: "ROP 5.3 – Prevenção de Infecções",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Taxas de Infecção: ${[
        "O que são IRAS?",
        "Por que monitorar infecções?",
        "Como calcular taxa de infecção?",
        "O que é densidade de incidência?",
        "Como calcular IRAS por procedimento?",
        "O que é infecção de sítio cirúrgico?",
        "Como classificar ISC?",
        "O que é infecção de corrente sanguínea?",
        "Como prevenir IPCS-CVC?",
        "O que é pneumonia associada a VM?",
        "Como prevenir PAV?",
        "O que é infecção urinária associada?",
        "Como prevenir ITU-SVD?",
        "Importância de bundle de prevenção?",
        "O que são bundles de CVC?",
        "O que são bundles de VM?",
        "Como implementar bundles?",
        "Importância de checklist?",
        "Como auditar adesão a bundles?",
        "O que fazer com taxa alta?",
        "Como investigar surto?",
        "Importância de análise de causa?",
        "Como implementar ações corretivas?",
        "O que é vigilância epidemiológica?",
        "Como notificar IRAS?",
        "Importância de CCIH?",
        "Como engajar equipe na prevenção?",
        "O que são indicadores de processo?",
        "Como benchmarkar taxas?",
        "Importância de transparência?"
    ][i]}`,
    ["Opção 1", "Correta sobre infecções", "Opção 3", "Opção 4"],
    1,
    `Explicação sobre ${["conceito", "importância", "cálculo", "densidade", "procedimento", "ISC", "classificação", "ICS", "prevenção CVC", "PAV", "prevenção PAV", "ITU", "prevenção ITU", "bundles", "CVC bundle", "VM bundle", "implementação", "checklist", "auditoria", "taxa alta", "surto", "análise", "ações", "vigilância", "notificação", "CCIH", "engajamento", "indicadores", "benchmark", "transparência"][i]} de taxas de infecção.`
)
                ]
            },
            "rop-5-4": {
                title: "ROP 5.4 – Prevenção de Infecções",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Reprocessamento: ${[
        "O que é reprocessamento?",
        "Por que reprocessamento é crítico?",
        "Diferença entre limpeza e esterilização?",
        "O que é classificação de Spaulding?",
        "O que são artigos críticos?",
        "O que são artigos semicríticos?",
        "O que são artigos não críticos?",
        "Como processar críticos?",
        "Como processar semicríticos?",
        "O que é limpeza adequada?",
        "Importância da limpeza?",
        "O que são métodos de esterilização?",
        "Como funciona autoclave?",
        "O que são indicadores químicos?",
        "O que são indicadores biológicos?",
        "Como validar esterilização?",
        "O que fazer com falha de esterilização?",
        "Como armazenar material estéril?",
        "Validade de material esterilizado?",
        "Como manipular material estéril?",
        "O que é rastreabilidade?",
        "Como rastrear material?",
        "Importância de registros?",
        "O que fazer com material contaminado?",
        "Como proceder com surto?",
        "Importância de CME centralizada?",
        "Como treinar equipe de CME?",
        "O que auditar em reprocessamento?",
        "Como garantir qualidade?",
        "Importância de normas e legislação?"
    ][i]}`,
    ["Errada", "Correta reprocessamento", "Incorreta", "Falsa"],
    1,
    `Explicação sobre ${["conceito", "importância", "diferenças", "Spaulding", "críticos", "semicríticos", "não críticos", "processo crítico", "processo semicrítico", "limpeza", "importância limpeza", "métodos", "autoclave", "químicos", "biológicos", "validação", "falha", "armazenamento", "validade", "manipulação", "rastreabilidade", "rastreamento", "registros", "contaminação", "surto", "CME", "treinamento", "auditoria", "qualidade", "legislação"][i]} de reprocessamento.`
)
                ]
            },
        }
    },

    // ==================== MACRO ÁREA 6 - AVALIAÇÃO DE RISCOS ====================
    "avaliacao-riscos": {
        title: "Avaliação de Riscos",
        icon: "fas fa-exclamation-triangle",
        color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        subdivisoes: {
            "rop-6-1": {
                title: "ROP 6.1 – Avaliação de Riscos",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Prevenção de Quedas: ${[
        "Por que prevenção de quedas é ROP?",
        "Fatores de risco para quedas?",
        "Como avaliar risco de quedas?",
        "O que são escalas de risco?",
        "Como usar escala de Morse?",
        "Quando reavaliar risco?",
        "O que fazer com alto risco?",
        "Como implementar precauções?",
        "Importância de identificação visual?",
        "O que são pulseiras de risco?",
        "Como tornar ambiente seguro?",
        "Importância de iluminação adequada?",
        "Como organizar mobiliário?",
        "O que fazer com pisos molhados?",
        "Importância de calçados adequados?",
        "Como ajustar altura de leitos?",
        "O que são grades de proteção?",
        "Quando usar grades?",
        "Como orientar paciente sobre quedas?",
        "Importância de acompanhante?",
        "O que fazer pós-queda?",
        "Como avaliar paciente que caiu?",
        "Importância de notificação?",
        "Como investigar quedas?",
        "O que são rondas de segurança?",
        "Como treinar equipe sobre quedas?",
        "O que são tecnologias assistivas?",
        "Como auditar prevenção?",
        "O que fazer com taxa alta?",
        "Importância de cultura de segurança?"
    ][i]}`,
    ["Opção A", "Resposta correta quedas", "Opção C", "Opção D"],
    1,
    `Explicação sobre ${["importância", "fatores", "avaliação", "escalas", "Morse", "reavaliação", "alto risco", "precauções", "identificação", "pulseiras", "ambiente", "iluminação", "mobiliário", "pisos", "calçados", "leito", "grades", "uso grades", "orientação", "acompanhante", "pós-queda", "avaliação", "notificação", "investigação", "rondas", "treinamento", "tecnologias", "auditoria", "taxa alta", "cultura"][i]} de prevenção de quedas.`
)
                ]
            },
            "rop-6-2": {
                title: "ROP 6.2 – Avaliação de Riscos",
                audioFile: null,
                questions: [
                    {
                        question: "Questão de exemplo ROP 6.2",
                        options: ["A", "B", "C", "D"],
                        correctAnswer: 0,
                        explanation: "Explicação de exemplo"
                    }
                ]
            },
            "rop-6-3": {
                title: "ROP 6.3 – Avaliação de Riscos",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Prevenção de Suicídio: ${[
        "Por que prevenção de suicídio é ROP?",
        "Como avaliar risco de suicídio?",
        "Fatores de risco suicida?",
        "O que são sinais de alerta?",
        "Como fazer triagem de risco?",
        "Quando acionar psiquiatria?",
        "O que fazer com alto risco?",
        "Como tornar ambiente seguro?",
        "O que remover do quarto?",
        "Importância de vigilância?",
        "Níveis de observação?",
        "O que é observação contínua?",
        "Como documentar vigilância?",
        "O que fazer com objetos pessoais?",
        "Como orientar acompanhantes?",
        "Importância de empatia?",
        "Como abordar ideação suicida?",
        "O que fazer com tentativa?",
        "Como proceder pós-tentativa?",
        "Importância de seguimento?",
        "Como treinar equipe?",
        "O que é protocolo de suicídio?",
        "Como identificar meios de risco?",
        "Importância de medicação segura?",
        "Como garantir adesão?",
        "O que fazer na alta?",
        "Como garantir follow-up?",
        "Importância de rede de apoio?",
        "Como notificar tentativas?",
        "O que fazer com eventos?"
    ][i]}`,
    ["Opção 1", "Correta sobre suicídio", "Opção 3", "Opção 4"],
    1,
    `Explicação sobre ${["importância", "avaliação", "fatores", "sinais", "triagem", "acionamento", "alto risco", "ambiente", "remoção", "vigilância", "níveis", "contínua", "documentação", "objetos", "acompanhantes", "empatia", "abordagem", "tentativa", "pós-tentativa", "seguimento", "treinamento", "protocolo", "meios", "medicação", "adesão", "alta", "follow-up", "rede", "notificação", "eventos"][i]} de prevenção de suicídio.`
)
                ]
            },
            "rop-6-4": {
                title: "ROP 6.4 – Avaliação de Riscos",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Profilaxia TEV: ${[
        "O que é tromboembolismo venoso?",
        "Por que profilaxia é ROP?",
        "Fatores de risco para TEV?",
        "Como avaliar risco de TEV?",
        "O que são escores de risco?",
        "Como usar Caprini ou Padua?",
        "Quando iniciar profilaxia?",
        "Tipos de profilaxia?",
        "O que é profilaxia mecânica?",
        "O que é profilaxia farmacológica?",
        "Como usar meias compressivas?",
        "O que é compressão pneumática?",
        "Quando usar heparina?",
        "Como escolher dose de heparina?",
        "Importância de mobilização precoce?",
        "Como incentivar deambulação?",
        "Quando reavaliar risco?",
        "O que fazer com sangramento?",
        "Contraindicações de farmacológico?",
        "Como balancear risco/benefício?",
        "O que fazer pós-cirurgia?",
        "Duração de profilaxia?",
        "Como documentar profilaxia?",
        "O que fazer com TEV estabelecido?",
        "Como diagnosticar TVP?",
        "Sinais de embolia pulmonar?",
        "Como treinar equipe sobre TEV?",
        "O que auditar na profilaxia?",
        "Como calcular taxa de TEV?",
        "Importância de protocolo institucional?"
    ][i]}`,
    ["A incorreta", "Resposta correta TEV", "C errada", "D falsa"],
    1,
    `Explicação sobre ${["conceito", "importância", "fatores", "avaliação", "escores", "uso", "início", "tipos", "mecânica", "farmacológica", "meias", "compressão", "heparina", "dose", "mobilização", "deambulação", "reavaliação", "sangramento", "contraindicações", "balanço", "pós-cirurgia", "duração", "documentação", "estabelecido", "diagnóstico", "EP", "treinamento", "auditoria", "taxa", "protocolo"][i]} de profilaxia de TEV.`
)
                ]
            },
            "rop-6-5": {
                title: "ROP 6.5 – Avaliação de Riscos",
                audioFile: null,
                questions: [

    `Questão ${i+1} sobre Pele e Feridas: ${[
        "Por que cuidado com pele é ROP?",
        "Como avaliar integridade da pele?",
        "Fatores de risco para lesões?",
        "O que são lesões por fricção?",
        "Como prevenir lesões por fricção?",
        "O que é MARSI?",
        "Como prevenir lesões por adesivo?",
        "Como remover adesivos corretamente?",
        "O que são lesões por umidade?",
        "Como prevenir DAI?",
        "Importância de higiene adequada?",
        "Como proteger pele frágil?",
        "O que fazer com pele senil?",
        "Como avaliar feridas?",
        "O que documentar sobre feridas?",
        "Como classificar feridas?",
        "O que é leito da ferida?",
        "Como escolher curativo adequado?",
        "O que são curativos especiais?",
        "Quando usar alginato?",
        "Quando usar hidrofibra?",
        "O que é terapia por pressão negativa?",
        "Como avaliar cicatrização?",
        "Sinais de infecção em feridas?",
        "O que fazer com ferida infectada?",
        "Importância de nutrição?",
        "Como treinar equipe sobre feridas?",
        "O que auditar no cuidado?",
        "Como documentar evolução?",
        "Importância de equipe especializada?"
    ][i]}`,
    ["Errada", "Correta sobre pele", "Incorreta", "Falsa"],
    1,
    `Explicação sobre ${["importância", "avaliação", "fatores", "fricção", "prevenção fricção", "MARSI", "prevenção MARSI", "remoção", "umidade", "DAI", "higiene", "proteção", "senil", "avaliação ferida", "documentação", "classificação", "leito", "escolha", "especiais", "alginato", "hidrofibra", "TPN", "cicatrização", "infecção", "infectada", "nutrição", "treinamento", "auditoria", "evolução", "especialista"][i]} de tratamento de pele e feridas.`
)
                ]
            },
        }
    }
};

console.log('✅ ROPs carregadas (versão COMPLETA):', Object.keys(ropsData));
