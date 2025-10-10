export const quizData = {
    "1": {
        name: "Cultura de Segurança",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
        color: "bg-blue-500",
        subdivisions: {
            "1.1": {
                name: "ROP 1.1 – Responsabilização pela Qualidade",
                questions: [
                    { question: "Quem é o principal responsável pela qualidade e segurança do paciente na organização, segundo as ROPs?", options: ["A equipe de enfermagem", "O comitê de segurança", "A alta administração (ou governança)", "O paciente"], correctAnswer: 2 },
                    { question: "Qual é um dos principais papéis da alta administração para demonstrar compromisso com a qualidade?", options: ["Realizar auditorias anuais", "Manter a qualidade como um item permanente na pauta de todas as reuniões", "Delegar todas as decisões de qualidade para os gestores de departamento", "Focar exclusivamente em resultados financeiros"], correctAnswer: 1 },
                    { question: "Para uma supervisão eficaz da qualidade, o que é essencial que os membros da alta administração possuam?", options: ["Formação em medicina", "Bom conhecimento sobre os princípios de qualidade e segurança", "Experiência em gestão de recursos humanos", "Habilidade em negociação de contratos"], correctAnswer: 1 },
                    { question: "Em uma cultura justa, qual é a abordagem principal ao analisar um incidente de segurança?", options: ["Identificar o indivíduo culpado e aplicar uma sanção", "Focar na melhoria dos sistemas e processos para prevenir futuras ocorrências", "Manter o incidente em sigilo para proteger a reputação da instituição", "Oferecer compensação financeira imediata ao paciente"], correctAnswer: 1 },
                    { question: "Como a responsabilização dos líderes (como o CEO) pelo desempenho em qualidade deve ser formalizada?", options: ["Através de um acordo verbal", "Como parte de sua avaliação de desempenho formal", "Apenas em relatórios anuais para acionistas", "Não precisa ser formalizada, é uma responsabilidade implícita"], correctAnswer: 1 },
                    { question: "A criação de uma cultura de segurança é responsabilidade exclusiva do departamento de qualidade. Esta afirmação é:", options: ["Verdadeira", "Falsa"], correctAnswer: 1 },
                    { question: "Qual indicador sistêmico é mais relevante para a alta administração monitorar o desempenho da qualidade?", options: ["Tempo médio de espera no pronto-socorro", "Número de incidentes de segurança do paciente com dano", "Índice de satisfação dos funcionários", "Lucratividade do hospital"], correctAnswer: 1 },
                    { question: "O que significa 'a qualidade é um item permanente na pauta'?", options: ["O tema é discutido apenas quando há um problema grave", "A qualidade é uma prioridade estratégica discutida com regularidade em todas as reuniões da liderança", "O tema é sempre o último a ser abordado na reunião", "Apenas os sucessos relacionados à qualidade são apresentados"], correctAnswer: 1 },
                    { question: "Como o recrutamento de membros com conhecimento em segurança pode fortalecer a alta administração?", options: ["Aumentando o número de reuniões anuais", "Trazendo novas perspectivas e competências para a supervisão da qualidade", "Reduzindo a necessidade de relatórios de desempenho", "Automatizando a tomada de decisões sobre segurança"], correctAnswer: 1 },
                    { question: "Ao receber um relatório de desempenho que aponta falhas, o que a alta administração deve fazer?", options: ["Ignorar o relatório para não desmotivar a equipe", "Usar as informações para tomar decisões e definir novas prioridades de melhoria", "Demitir os gestores das áreas com piores resultados", "Contratar uma consultoria externa imediatamente"], correctAnswer: 1 },
                    { question: "Uma organização que busca a excelência em qualidade deve basear suas decisões de alocação de recursos em quê?", options: ["Opinião pública e cobertura da mídia", "Informações e dados sobre o desempenho em qualidade", "Preferências pessoais da liderança", "Estratégias da concorrência"], correctAnswer: 1 },
                    { question: "Qual a melhor forma da alta administração entender os desafios da segurança na linha de frente?", options: ["Lendo apenas relatórios consolidados", "Participando de rondas de segurança do paciente e conversando com a equipe", "Analisando apenas as reclamações formais dos pacientes", "Confiando exclusivamente nos dados de auditoria externa"], correctAnswer: 1 },
                    { question: "A definição dos principais indicadores sistêmicos para monitorar o desempenho em qualidade é uma tarefa de quem?", options: ["Apenas da equipe de TI", "Da alta administração, em colaboração com os líderes", "Exclusivamente do departamento financeiro", "Dos pacientes e suas famílias"], correctAnswer: 1 },
                    { question: "A avaliação do desempenho em qualidade da organização deve ser comparada com o quê?", options: ["Apenas com o desempenho do ano anterior", "Com as metas e objetivos acordados previamente", "Com o hospital concorrente de maior prestígio", "Com os padrões mínimos exigidos pela legislação"], correctAnswer: 1 },
                    { question: "Qual o principal objetivo de ligar a avaliação de desempenho dos líderes ao desempenho em qualidade?", options: ["Aumentar o salário dos líderes", "Garantir que a qualidade seja uma prioridade real e que haja responsabilização", "Cumprir uma formalidade burocrática", "Facilitar a demissão de líderes com baixo desempenho"], correctAnswer: 1 }
                ]
            },
            "1.2": {
                name: "ROP 1.2 – Gestão de Incidentes",
                questions: [
                    { question: "O que é um 'quase erro' (near miss) na gestão de incidentes?", options: ["Um erro que causou dano grave ao paciente", "Um incidente que não atingiu o paciente, mas tinha potencial para causar dano", "Um erro administrativo sem consequências clínicas", "Uma reclamação formal de um familiar"], correctAnswer: 1 },
                    { question: "Qual é o primeiro passo a ser tomado imediatamente após um incidente de segurança com um paciente?", options: ["Preencher o formulário de notificação", "Garantir a segurança imediata do paciente e prestar os cuidados necessários", "Identificar o profissional culpado", "Comunicar o departamento jurídico"], correctAnswer: 1 },
                    { question: "Qual a principal finalidade da Análise de Causa Raiz (ACR) após um incidente grave?", options: ["Determinar a punição para o profissional envolvido", "Identificar os fatores sistêmicos que contribuíram para o erro e recomendar melhorias", "Calcular o impacto financeiro do evento", "Preparar a defesa legal da instituição"], correctAnswer: 1 },
                    { question: "Por que é crucial que o sistema de notificação de incidentes seja simples, claro e confidencial?", options: ["Para diminuir a carga de trabalho administrativo", "Para encorajar todos, incluindo pacientes e famílias, a relatar sem medo de retaliação", "Para facilitar a compilação de dados para relatórios anuais", "Para atender a uma exigência mínima dos órgãos de acreditação"], correctAnswer: 1 },
                    { question: "Quem deve ser incentivado a relatar incidentes de segurança em uma cultura de segurança madura?", options: ["Apenas a equipe de enfermagem", "Apenas os médicos", "Apenas a equipe clínica", "Todos, incluindo equipe, pacientes e famílias"], correctAnswer: 3 },
                    { question: "Um paciente relata que quase recebeu o medicamento errado, mas a enfermeira percebeu a tempo. Como isso deve ser classificado?", options: ["Evento adverso", "Incidente sem dano", "Quase erro (near miss)", "Não é um incidente, pois o erro não foi consumado"], correctAnswer: 2 },
                    { question: "O que significa 'preservar todos os itens relacionados ao incidente'?", options: ["Guardar apenas a documentação escrita", "Manter equipamentos, embalagens e outros itens envolvidos para análise futura", "Fotografar a cena e descartar tudo para liberar o espaço", "Entrevistar apenas a pessoa que cometeu o erro"], correctAnswer: 1 },
                    { question: "As informações sobre as melhorias recomendadas após a análise de um incidente devem ser compartilhadas com quem?", options: ["Apenas com a alta administração", "Apenas com a equipe envolvida no incidente", "Com pacientes, famílias e membros da equipe, de forma ampla", "Apenas com o departamento jurídico"], correctAnswer: 2 },
                    { question: "Um sistema eficaz de gestão de incidentes deve focar principalmente em:", options: ["Culpabilização individual", "Melhoria do sistema e aprendizado organizacional", "Conformidade regulatória apenas", "Redução de custos a curto prazo"], correctAnswer: 1 },
                    { question: "A análise de um 'quase erro' é menos importante que a de um evento com dano. Esta afirmação é:", options: ["Verdadeira", "Falsa"], correctAnswer: 1 },
                    { question: "Qual o principal benefício de analisar incidentes similares em conjunto?", options: ["Punir equipes com desempenho consistentemente baixo", "Detectar padrões ou tendências que indicam falhas de sistema subjacentes", "Criar um ranking de erros por departamento", "Aumentar a burocracia do sistema de notificação"], correctAnswer: 1 },
                    { question: "No contexto da gestão de incidentes, o que é um 'evento com dano'?", options: ["Qualquer erro que ocorra", "Um incidente que resulta em prejuízo para o paciente", "Um quase erro que foi interceptado", "Uma reclamação de um familiar"], correctAnswer: 1 },
                    { question: "O que deve acontecer com as recomendações geradas pela análise de um incidente?", options: ["Devem ser arquivadas para referência futura", "Devem ser revisadas e, se aceitas, um plano de implementação deve ser criado", "Devem ser implementadas apenas se não tiverem custo", "Devem ser rejeitadas se a equipe não concordar"], correctAnswer: 1 },
                    { question: "Como a eficácia do sistema de gestão de incidentes pode ser avaliada?", options: ["Pelo número de notificações, que deve diminuir com o tempo", "Avaliando se as melhorias são implementadas e se a equipe se sente à vontade para notificar", "Pela ausência total de incidentes", "Pela rapidez com que os formulários são preenchidos"], correctAnswer: 1 },
                    { question: "A resposta imediata a um incidente de segurança NÃO inclui:", options: ["Cuidar das necessidades urgentes do paciente", "Preservar itens relacionados ao incidente", "Determinar imediatamente a culpa pelo ocorrido", "Relatar o incidente usando o processo aprovado"], correctAnswer: 2 }
                ]
            },
            "1.3": {
                name: "ROP 1.3 – Relatórios Trimestrais",
                questions: [
                    { question: "Com que frequência a alta administração deve receber relatórios sobre a segurança do paciente?", options: ["Anualmente", "Semestralmente", "Trimestralmente", "Apenas quando um evento grave ocorre"], correctAnswer: 2 },
                    { question: "Qual o principal objetivo de enviar relatórios trimestrais sobre segurança para a alta administração?", options: ["Cumprir uma exigência burocrática", "Manter a liderança informada para apoiar e direcionar as atividades de melhoria da qualidade", "Comparar o desempenho com hospitais concorrentes", "Documentar falhas para fins de auditoria"], correctAnswer: 1 },
                    { question: "O que deve constar nos relatórios trimestrais de segurança, além da análise de eventos adversos?", options: ["Apenas dados financeiros dos incidentes", "As melhorias que foram realizadas e as medidas recomendadas para o futuro", "Uma lista dos profissionais envolvidos nos incidentes", "O número de horas de treinamento de cada funcionário"], correctAnswer: 1 },
                    { question: "O envolvimento da alta administração na análise dos relatórios de segurança leva a melhores resultados e processos de atendimento. Esta afirmação é:", options: ["Verdadeira", "Falsa"], correctAnswer: 0 },
                    { question: "Qual o papel da alta administração ao receber os relatórios trimestrais?", options: ["Apenas arquivar o documento para registro", "Apoiar as atividades de segurança e colocar em ação as medidas recomendadas", "Delegar a análise para um comitê júnior", "Questionar a validade dos dados sem propor ações"], correctAnswer: 1 },
                    { question: "Por que é importante que a alta administração tenha ciência das questões de segurança?", options: ["Para poder culpar os gestores em caso de falhas", "Porque eles são responsáveis, em última instância, pela qualidade e segurança dos serviços prestados", "Apenas para fins de imagem e marketing institucional", "Porque eles são os únicos capazes de resolver os problemas"], correctAnswer: 1 },
                    { question: "A análise de um surto de infecção e as ações tomadas devem ser incluídas no relatório trimestral de segurança?", options: ["Não, isso pertence apenas ao comitê de controle de infecção", "Sim, pois impacta diretamente a segurança do paciente", "Apenas se tiver resultado em óbito", "Não, a menos que a mídia tenha noticiado"], correctAnswer: 1 },
                    { question: "Os relatórios trimestrais ajudam a organização a ser mais:", options: ["Burocrática", "Reativa, focando apenas em problemas passados", "Proativa, identificando tendências e prevenindo futuros incidentes", "Fechada, reduzindo a transparência com a equipe"], correctAnswer: 2 },
                    { question: "Se nenhuma melhoria foi implementada no trimestre, o relatório deve omitir essa informação?", options: ["Sim, para apresentar um relatório positivo", "Não, o relatório deve refletir a realidade, incluindo a falta de progresso, para gerar ação", "Deve-se inventar melhorias para o relatório", "O relatório não deve ser enviado nesse caso"], correctAnswer: 1 },
                    { question: "A análise de 'quase erros' deve fazer parte dos dados compilados para o relatório trimestral?", options: ["Não, pois nenhum dano ocorreu", "Sim, pois são oportunidades valiosas de aprendizado e prevenção de danos futuros", "Apenas se o 'quase erro' envolveu um medicamento de alta vigilância", "Não, para não sobrecarregar a alta administração com informações"], correctAnswer: 1 },
                    { question: "O que a alta administração deve fazer com as 'medidas recomendadas' presentes no relatório?", options: ["Ignorá-las se forem muito caras", "Analisar sua viabilidade e garantir que sejam implementadas ou justificar por que não são", "Passá-las para outro departamento sem acompanhamento", "Aprovar todas automaticamente, sem análise"], correctAnswer: 1 },
                    { question: "Quem é o público principal dos relatórios trimestrais de segurança?", options: ["A imprensa", "Os pacientes", "A alta administração e o órgão de governança", "A equipe da linha de frente"], correctAnswer: 2 },
                    { question: "Os relatórios de segurança do paciente devem focar apenas em aspectos negativos?", options: ["Sim, o objetivo é apontar falhas", "Não, devem incluir tanto as áreas de melhoria quanto as realizações e sucessos em segurança", "Sim, para manter a equipe alerta", "Não, devem focar apenas nos aspectos positivos"], correctAnswer: 1 },
                    { question: "Qual a consequência de a alta administração não receber ou não analisar esses relatórios?", options: ["A organização economiza tempo", "A segurança do paciente deixa de ser uma prioridade estratégica, e a cultura de segurança enfraquece", "A equipe se sente mais autônoma e feliz", "Nada, a segurança continua a mesma"], correctAnswer: 1 },
                    { question: "Os dados apresentados nos relatórios trimestrais devem ser:", options: ["Complexos e técnicos", "Claramente apresentados, com análises de tendências para facilitar a tomada de decisão", "Genéricos e sem detalhes", "Focados apenas em um único departamento"], correctAnswer: 1 }
                ]
            },
            "1.4": {
                name: "ROP 1.4 – Divulgação de Incidentes (Disclosure)",
                questions: [
                    { question: "O que é 'divulgação' (disclosure) no contexto de um incidente de segurança do paciente?", options: ["Manter o incidente em segredo para evitar processos", "Comunicar de forma honesta e transparente ao paciente e/ou família sobre o que aconteceu", "Divulgar o erro internamente como um exemplo punitivo", "Comunicar o ocorrido apenas à seguradora"], correctAnswer: 1 },
                    { question: "Qual destes NÃO é um componente central do processo de divulgação?", options: ["Informar que um incidente ocorreu e pedir desculpas", "Explicar o que aconteceu com base nos fatos conhecidos", "Garantir que o paciente assine um termo desistindo de buscar reparação legal", "Oferecer apoio prático e emocional a todos os envolvidos"], correctAnswer: 2 },
                    { question: "Após um erro de medicação com dano, quando a divulgação ao paciente deve começar?", options: ["Após a conclusão da análise de causa raiz, o que pode levar meses", "O mais rápido possível, comunicando os fatos conhecidos e o compromisso de investigar", "Apenas se o paciente perguntar diretamente sobre o erro", "Depois que os advogados da instituição autorizarem"], correctAnswer: 1 },
                    { question: "O processo de divulgação é um evento único ou um diálogo contínuo?", options: ["Um evento único, realizado imediatamente após o incidente", "Um diálogo contínuo, que pode envolver várias conversas com o paciente e a família à medida que mais informações se tornam disponíveis", "Um relatório escrito enviado ao paciente por correio", "Uma reunião formal única com a presença de advogados"], correctAnswer: 1 },
                    { question: "O apoio oferecido durante o processo de divulgação deve ser direcionado a quem?", options: ["Apenas ao paciente que sofreu o dano", "Apenas à equipe envolvida, que pode estar abalada", "Apenas à família do paciente", "A todos os envolvidos: paciente, família e a equipe"], correctAnswer: 3 },
                    { question: "Pedir desculpas durante a divulgação de um incidente é considerado:", options: ["Uma admissão de culpa legal que deve ser evitada a todo custo", "Um componente essencial da comunicação honesta, empática e curativa", "Irrelevante para o paciente e a família", "Uma formalidade que pode ser feita por qualquer funcionário"], correctAnswer: 1 },
                    { question: "Quem deve ser responsável por orientar e dar apoio ao processo de divulgação?", options: ["O profissional que cometeu o erro", "Um advogado do hospital", "Pessoas que receberam treinamento específico em divulgação", "O diretor do hospital"], correctAnswer: 2 },
                    { question: "É necessário ter todas as respostas sobre o porquê de um incidente ter ocorrido antes de iniciar a divulgação?", options: ["Sim, a divulgação só pode ocorrer após a análise de causa raiz completa", "Não, a comunicação inicial deve ser rápida, mesmo que a investigação ainda esteja em andamento", "Sim, para evitar passar informações incorretas", "Depende da gravidade do dano"], correctAnswer: 1 },
                    { question: "Coletar a opinião do paciente e da família sobre sua experiência com o processo de divulgação é importante para:", options: ["Apenas para documentação interna", "Melhorar o processo de divulgação da organização para futuros eventos", "Determinar a compensação financeira", "Cumprir uma formalidade burocrática"], correctAnswer: 1 },
                    { question: "A divulgação se aplica a 'quase erros' (near misses)?", options: ["Não, pois não houve dano ao paciente", "Sim, sempre, para todos os 'quase erros'", "Geralmente não é obrigatória, mas a transparência é um bom princípio, especialmente se o paciente percebeu o evento", "Sim, é uma exigência legal em todos os casos"], correctAnswer: 2 },
                    { question: "Qual a melhor maneira de documentar uma conversa de divulgação?", options: ["Não documentar nada para evitar problemas legais", "Gravar a conversa sem o consentimento do paciente", "Registrar no prontuário o conteúdo da conversa, as perguntas feitas e as informações fornecidas", "Apenas obter a assinatura do paciente em um formulário padrão"], correctAnswer: 2 },
                    { question: "Em um incidente que afeta múltiplos pacientes (ex: falha na esterilização), a abordagem de divulgação deve ser:", options: ["A mesma de um incidente individual, falando com um de cada vez", "Coordenada, identificando todos os expostos ao risco e definindo a melhor forma de contatá-los", "Evitada para não causar pânico em massa", "Feita apenas através de um comunicado de imprensa"], correctAnswer: 1 },
                    { question: "Qual o principal objetivo da divulgação para o paciente e a família?", options: ["Prevenir um processo judicial", "Restaurar a confiança e promover a cura após um evento adverso", "Transferir a culpa para o sistema", "Fornecer todos os detalhes técnicos da falha"], correctAnswer: 1 },
                    { question: "O processo de divulgação deve ser revisado e atualizado pela organização?", options: ["Não, uma vez definido, deve permanecer o mesmo", "Sim, com a contribuição de pacientes, famílias e equipe para garantir sua eficácia", "Apenas quando a lei mudar", "Apenas se a organização for processada"], correctAnswer: 1 },
                    { question: "Qual o papel do apoio emocional/psicológico para a equipe após um incidente?", options: ["É desnecessário, pois são profissionais", "Ajuda a lidar com o estresse e o trauma do evento, promovendo uma cultura de segurança", "É uma admissão de que a equipe é fraca", "Serve apenas para evitar que peçam demissão"], correctAnswer: 1 }
                ]
            }
        }
    },
    "2": {
        name: "Comunicação",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.28c-.447.034-.894.125-1.332.284a2.25 2.25 0 1 1-2.008-3.931l2.5-1.428a2.25 2.25 0 0 0-2.008-3.931l-3.722-.28A2.25 2.25 0 0 0 5.25 8.511v4.286c0 .969.616 1.813 1.5 2.097m5.25-1.135-2.5 1.428m2.5-1.428 2.5 1.428m0 0 .041.02a2.25 2.25 0 0 1 0 3.932l-.041.022M12 9.75l2.5-1.428M12 9.75l-2.5-1.428m0 0-.041-.022a2.25 2.25 0 0 0 0 3.932l.041-.022" /></svg>`,
        color: "bg-teal-500",
        subdivisions: {
            "2.1": {
                name: "ROP 2.1 – Identificação do Cliente",
                questions: [
                    { question: "Quais são os dois identificadores mais comuns e seguros para a identificação do paciente?", options: ["Número do leito e diagnóstico", "Nome completo e data de nascimento", "Nome do médico e número do convênio", "Cor da pulseira e nome da mãe"], correctAnswer: 1 },
                    { question: "Antes de qual procedimento a checagem de, no mínimo, dois identificadores é obrigatória?", options: ["Entrega de refeições", "Visita de familiares", "Administração de medicamentos, coleta de amostras e transfusões", "Limpeza do quarto"], correctAnswer: 2 },
                    { question: "Por que o número do leito NÃO deve ser usado como um identificador primário do paciente?", options: ["Porque é difícil de lembrar", "Porque os pacientes podem ser movidos de leito, levando a erros graves", "Porque não é confidencial", "Porque os sistemas eletrônicos não o reconhecem"], correctAnswer: 1 },
                    { question: "Qual a forma correta de confirmar a identidade de um paciente verbalmente?", options: ["Perguntar 'Você é o Sr. João da Silva?'", "Perguntar 'Qual é o seu nome completo e sua data de nascimento?'", "Ler o nome na pulseira em voz alta", "Perguntar ao acompanhante qual o nome do paciente"], correctAnswer: 1 },
                    { question: "Ao coletar uma amostra de sangue, quando o tubo deve ser etiquetado?", options: ["Antes de entrar no quarto", "Após a coleta, no posto de enfermagem", "A qualquer momento antes de enviar ao laboratório", "À beira do leito, na presença do paciente, imediatamente após a coleta"], correctAnswer: 3 },
                    { question: "Para um paciente inconsciente que chega à emergência sem documentos, como a equipe deve proceder?", options: ["Aguardar a chegada de um familiar para iniciar o tratamento", "Usar um nome genérico como 'Não Identificado 1'", "Atribuir um número de registro temporário e único, associando-o a todos os cuidados", "Usar características físicas como 'homem de camisa azul'"], correctAnswer: 2 },
                    { question: "Qual medida de segurança adicional é crucial ao lidar com pacientes com nomes iguais (homônimos) na mesma unidade?", options: ["Colocá-los em quartos distantes", "Usar um alerta visual bem destacado nos prontuários, prescrições e portas", "Pedir para um deles usar o sobrenome da mãe", "Transferir um dos pacientes para outra ala do hospital"], correctAnswer: 1 },
                    { question: "A participação ativa do paciente na confirmação de sua identidade é uma prática de segurança recomendada?", options: ["Não, isso transfere a responsabilidade para o paciente", "Sim, envolver o paciente (quando possível) é uma barreira de segurança adicional", "Não, apenas a equipe deve realizar a checagem", "Sim, mas apenas na admissão"], correctAnswer: 1 },
                    { question: "A identificação do paciente é uma responsabilidade exclusiva da equipe de enfermagem?", options: ["Sim, apenas eles administram medicamentos", "Não, é uma responsabilidade de todos os profissionais de saúde que interagem com o paciente", "Sim, conforme definido pela maioria dos hospitais", "Não, a responsabilidade é do médico que o internou"], correctAnswer: 1 },
                    { question: "O que deve ser feito se a pulseira de identificação de um paciente estiver ilegível ou danificada?", options: ["Ignorar a pulseira e confiar na memória", "Perguntar ao paciente seu nome e prosseguir", "Substituí-la imediatamente por uma nova, após confirmar os dados com o paciente", "Anotar os dados em um esparadrapo e colar por cima"], correctAnswer: 2 }
                ]
            },
            "2.2": {
                name: "ROP 2.2 – Lista de Abreviações Perigosas",
                questions: [
                    { question: "Por que o uso da abreviação 'U' para 'unidade' é perigoso?", options: ["Porque é informal", "Pode ser confundida com '0', '4' ou 'cc', causando erros graves de dosagem", "Porque os sistemas eletrônicos não a reconhecem", "Porque atrasa a dispensação na farmácia"], correctAnswer: 1 },
                    { question: "Qual é a maneira mais segura de prescrever '5 miligramas' para evitar erros?", options: ["5.0 mg", "5 mg", ".5 mg", "mg 5"], correctAnswer: 1 },
                    { question: "A abreviação 'SC' para subcutâneo é perigosa porque pode ser confundida com qual outra sigla?", options: ["SL (sublingual)", "IM (intramuscular)", "IV (intravenoso)", "VO (via oral)"], correctAnswer: 0 },
                    { question: "Qual é a forma recomendada de escrever 'uma vez ao dia' em uma prescrição?", options: ["OD", "QD", "1x/d", "Escrever 'uma vez ao dia' por extenso"], correctAnswer: 3 },
                    { question: "O uso de um zero à direita após a vírgula (ex: 1,0 mg) é desaconselhado por quê?", options: ["Pode ser lido como '10 mg' se a vírgula não for bem visível", "É redundante e desnecessário", "Não é uma prática padrão internacional", "É difícil de digitar em sistemas eletrônicos"], correctAnswer: 0 },
                    { question: "Por outro lado, o uso de um zero à esquerda antes da vírgula para doses decimais (ex: 0,5 mg) é:", options: ["Desaconselhado, pois é óbvio", "Obrigatório, para evitar que a dose seja lida como '5 mg'", "Opcional, dependendo da preferência do prescritor", "Permitido apenas para medicamentos líquidos"], correctAnswer: 1 },
                    { question: "As abreviações da 'lista de não usar' devem ser evitadas em qual tipo de documentação?", options: ["Apenas em prescrições manuscritas", "Apenas em prontuários eletrônicos", "Toda documentação relacionada a medicamentos, manuscrita ou eletrônica", "Apenas na comunicação verbal entre a equipe"], correctAnswer: 2 },
                    { question: "A abreviação 'HS' para 'hora de dormir' é perigosa por poder ser confundida com:", options: ["Meia-dose (half-strength)", "Hemograma Sanguíneo", "História Social", "Todas as anteriores"], correctAnswer: 0 },
                    { question: "Qual a melhor forma de prescrever 'sulfato de magnésio' para evitar confusão com 'sulfato de morfina'?", options: ["Usar MgSO4 e MSO4", "Usar apenas 'Magnésio' e 'Morfina'", "Escrever os nomes completos dos medicamentos por extenso", "Usar um código de cores nas prescrições"], correctAnswer: 2 },
                    { question: "O que a organização deve fazer após implementar uma lista de 'abreviações perigosas'?", options: ["Apenas afixar a lista nos murais", "Treinar a equipe, auditar a conformidade e atualizar a lista conforme necessário", "Aplicar multas a quem usar as abreviações", "Ignorar as prescrições que contiverem as abreviações"], correctAnswer: 1 }
                ]
            },
            "2.3": {
                name: "ROP 2.3 – Conciliação Medicamentosa como Prioridade Estratégica",
                questions: []
            },
            "2.4": {
                name: "ROP 2.4 – Conciliação em Serviços de Assistência Aguda (Internação)",
                questions: []
            },
            "2.5": {
                name: "ROP 2.5 – Conciliação em Atendimento Ambulatorial",
                questions: []
            },
            "2.6": {
                name: "ROP 2.6 – Conciliação no Serviço de Emergência",
                questions: []
            },
            "2.7": {
                name: "ROP 2.7 – Lista de Verificação para Cirurgia Segura",
                questions: []
            },
            "2.8": {
                name: "ROP 2.8 – Transferência de Informações nas Transições (Handoff)",
                questions: []
            }
        }
    },
    "3": {
        name: "Uso de Medicamentos",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>`,
        color: "bg-red-500",
        subdivisions: {
            "3.1": {
                name: "ROP 3.1 – Uso Racional de Antimicrobianos",
                questions: []
            },
            "3.2": {
                name: "ROP 3.2 – Eletrólitos Concentrados",
                questions": []
            },
            "3.3": {
                name: "ROP 3.3 – Segurança no Uso da Heparina",
                questions": []
            },
            "3.4": {
                name: "ROP 3.4 – Medicamentos de Alta Vigilância (MAV)",
                questions": []
            },
            "3.5": {
                name: "ROP 3.5 – Segurança das Bombas de Infusão",
                questions": []
            },
            "3.6": {
                name: "ROP 3.6 – Segurança no Uso de Narcóticos (Opioides)",
                questions": []
            }
        }
    },
    "4": {
        name: "Vida Profissional / Força de Trabalho",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>`,
        color: "bg-purple-500",
        subdivisions": {
            "4.1": {
                name: "ROP 4.1 – Programa de Manutenção Preventiva",
                questions": []
            },
            "4.2": {
                name: "ROP 4.2 – Segurança do Paciente: Capacitação e Treinamento",
                questions": []
            },
            "4.3": {
                name: "ROP 4.3 – Prevenção de Violência no Local de Trabalho",
                questions": []
            },
            "4.4": {
                name: "ROP 4.4 – Fluxo de Clientes",
                questions": []
            },
            "4.5": {
                name: "ROP 4.5 – Plano de Segurança do Paciente",
                questions": []
            }
        }
    },
    "5": {
        name: "Prevenção de Infecções",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>`,
        color: "bg-yellow-500",
        subdivisions": {
            "5.1": {
                name: "ROP 5.1 – Aderência às Práticas de Higiene das Mãos",
                questions": []
            },
            "5.2": {
                name: "ROP 5.2 – Higiene das Mãos: Capacitação e Treinamento",
                questions": []
            },
            "5.3": {
                name: "ROP 5.3 – Taxas de Infecção",
                questions": []
            },
            "5.4": {
                name: "ROP 5.4 – Reprocessamento",
                questions": []
            }
        }
    },
    "6": {
        name: "Avaliação de Riscos",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>`,
        color: "bg-indigo-500",
        subdivisions": {
            "6.1": {
                name: "ROP 6.1 – Prevenção de Quedas e Redução de Lesões (Internação)",
                questions": []
            },
            "6.2": {
                name: "ROP 6.2 – Prevenção de Úlceras por Pressão",
                questions": []
            },
            "6.3": {
                name: "ROP 6.3 – Prevenção de Suicídio",
                questions": []
            },
            "6.4": {
                name: "ROP 6.4 – Profilaxia para Tromboembolia Venosa (TEV)",
                questions": []
            },
            "6.5": {
                name: "ROP 6.5 – Tratamento da Pele e Feridas",
                questions": []
            }
        }
    },
    "7": {
        name: "Simulado Final",
        icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18a4.5 4.5 0 0 0-1.897-3.486l-3.103-1.897a4.5 4.5 0 0 0-6.012 0l-3.103 1.897A4.5 4.5 0 0 0 4.5 18" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 12.75h.008v.008H12v-.008z" /><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18a4.5 4.5 0 0 0-1.897-3.486l-3.103-1.897a4.5 4.5 0 0 0-6.012 0l-3.103 1.897A4.5 4.5 0 0 0 4.5 18" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5zM12 12.75h.008v.008H12v-.008z" /></svg>`,
        color: "bg-gray-700",
        subdivisions": {},
        isLocked: false 
    }
}

