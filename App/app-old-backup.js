// ==================== GLOBAL STATE ====================
let currentUser = null;
let currentScreen = 'home';
let currentQuiz = null;
let userProgress = {
    scores: {},
    completedTopics: [],
    totalPoints: 0,
    achievements: []
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Check authentication state
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            loadUserProgress();
            showMainApp();
        } else {
            showLoginScreen();
        }
    });
}

// ==================== AUTHENTICATION ====================
function showTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// Login with email/password
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        showLoading();
        await auth.signInWithEmailAndPassword(email, password);
        hideLoading();
        showToast('Login realizado com sucesso!', 'success');
    } catch (error) {
        hideLoading();
        handleAuthError(error);
    }
});

// Register new user
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerPasswordConfirm').value;
    
    if (password !== confirmPassword) {
        showToast('As senhas não coincidem!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('A senha deve ter pelo menos 6 caracteres!', 'error');
        return;
    }
    
    try {
        showLoading();
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // Update profile with name
        await userCredential.user.updateProfile({
            displayName: name
        });
        
        // Initialize user data in Firestore
        await db.collection('users').doc(userCredential.user.uid).set({
            name: name,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            progress: {},
            totalPoints: 0
        });
        
        hideLoading();
        showToast('Conta criada com sucesso!', 'success');
    } catch (error) {
        hideLoading();
        handleAuthError(error);
    }
});

// Login with Google
async function loginWithGoogle() {
    try {
        showLoading();
        const result = await auth.signInWithPopup(googleProvider);
        
        // Check if user exists in Firestore, if not create
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        if (!userDoc.exists) {
            await db.collection('users').doc(result.user.uid).set({
                name: result.user.displayName,
                email: result.user.email,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                progress: {},
                totalPoints: 0
            });
        }
        
        hideLoading();
        showToast('Login com Google realizado com sucesso!', 'success');
    } catch (error) {
        hideLoading();
        handleAuthError(error);
    }
}

// Reset password
async function resetPassword() {
    const email = prompt('Digite seu email para recuperação de senha:');
    if (!email) return;
    
    try {
        await auth.sendPasswordResetEmail(email);
        showToast('Email de recuperação enviado! Verifique sua caixa de entrada.', 'success');
    } catch (error) {
        handleAuthError(error);
    }
}

// Logout
async function logout() {
    if (confirm('Deseja realmente sair?')) {
        try {
            await auth.signOut();
            showToast('Logout realizado com sucesso!', 'success');
            showLoginScreen();
        } catch (error) {
            showToast('Erro ao fazer logout: ' + error.message, 'error');
        }
    }
}

// ==================== UI MANAGEMENT ====================
function showLoading() {
    document.getElementById('loadingScreen').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingScreen').style.display = 'none';
}

function showLoginScreen() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
    hideLoading();
}

function showMainApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    document.getElementById('userName').textContent = currentUser.displayName || currentUser.email;
    showScreen('home');
    hideLoading();
}

function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show selected screen
    const screen = document.getElementById(screenName + 'Screen');
    if (screen) {
        screen.classList.add('active');
        currentScreen = screenName;
    }
}

function goHome() {
    showScreen('home');
}

// ==================== TOAST NOTIFICATIONS ====================
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

function handleAuthError(error) {
    let message = 'Erro ao processar solicitação.';
    
    switch (error.code) {
        case 'auth/user-not-found':
            message = 'Usuário não encontrado.';
            break;
        case 'auth/wrong-password':
            message = 'Senha incorreta.';
            break;
        case 'auth/email-already-in-use':
            message = 'Este email já está em uso.';
            break;
        case 'auth/weak-password':
            message = 'A senha é muito fraca.';
            break;
        case 'auth/invalid-email':
            message = 'Email inválido.';
            break;
        case 'auth/popup-closed-by-user':
            message = 'Login cancelado pelo usuário.';
            break;
        default:
            message = error.message;
    }
    
    showToast(message, 'error');
}

// ==================== USER PROGRESS ====================
async function loadUserProgress() {
    try {
        const userDoc = await db.collection('users').doc(currentUser.uid).get();
        if (userDoc.exists) {
            const data = userDoc.data();
            userProgress = {
                scores: data.progress || {},
                completedTopics: data.completedTopics || [],
                totalPoints: data.totalPoints || 0,
                achievements: data.achievements || []
            };
        }
    } catch (error) {
        console.error('Erro ao carregar progresso:', error);
    }
}

async function saveUserProgress() {
    try {
        await db.collection('users').doc(currentUser.uid).update({
            progress: userProgress.scores,
            completedTopics: userProgress.completedTopics,
            totalPoints: userProgress.totalPoints,
            achievements: userProgress.achievements,
            lastUpdate: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Erro ao salvar progresso:', error);
    }
}

// ==================== ROPS SECTION ====================
function showROPs() {
    const screen = document.getElementById('ropsScreen');
    screen.innerHTML = `
        <button class="back-btn" onclick="goHome()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">ROPs - Desafio de Conhecimento</h2>
        
        <div class="menu-grid">
            ${Object.entries(ropsData).map(([key, macroArea]) => `
                <div class="menu-card" onclick="showMacroArea('${key}')">
                    <div class="card-icon" style="background: ${macroArea.color}">
                        <i class="${macroArea.icon}"></i>
                    </div>
                    <h3>${macroArea.title}</h3>
                    <p>${Object.keys(macroArea.subdivisoes).length} subdivisões</p>
                    ${getUserMacroProgress(key)}
                </div>
            `).join('')}
            
            <div class="menu-card" onclick="showSimulado()">
                <div class="card-icon" style="background: linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <h3>Simulado Geral</h3>
                <p>50+ questões de todas as ROPs</p>
            </div>
            
            <div class="menu-card" onclick="showRanking()">
                <div class="card-icon" style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%)">
                    <i class="fas fa-trophy"></i>
                </div>
                <h3>Ranking</h3>
                <p>Veja sua posição</p>
            </div>
        </div>
    `;
    showScreen('rops');
}

function getUserMacroProgress(macroKey) {
    const macroArea = ropsData[macroKey];
    const subdivisoes = Object.keys(macroArea.subdivisoes);
    const completed = subdivisoes.filter(sub => 
        userProgress.completedTopics.includes(sub)
    ).length;
    
    const percentage = Math.round((completed / subdivisoes.length) * 100);
    
    return `
        <div style="margin-top: 10px; padding: 5px 10px; background: rgba(102, 126, 234, 0.1); border-radius: 5px;">
            <small style="color: var(--primary-color); font-weight: 600;">
                ${percentage}% completo
            </small>
        </div>
    `;
}

function showMacroArea(macroKey) {
    const macroArea = ropsData[macroKey];
    const screen = document.getElementById('ropsScreen');
    
    screen.innerHTML = `
        <button class="back-btn" onclick="showROPs()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">${macroArea.title}</h2>
        
        <div class="menu-grid">
            ${Object.entries(macroArea.subdivisoes).map(([key, subdivisao]) => `
                <div class="menu-card" onclick="startQuiz('${macroKey}', '${key}')">
                    <div class="card-icon" style="background: ${macroArea.color}">
                        <i class="fas fa-clipboard-question"></i>
                    </div>
                    <h3>${subdivisao.title}</h3>
                    <p>${subdivisao.questions.length} questões</p>
                    ${getSubdivisaoProgress(key)}
                </div>
            `).join('')}
            
            <div class="menu-card" onclick="startQuiz('${macroKey}', 'all')">
                <div class="card-icon" style="background: ${macroArea.color}">
                    <i class="fas fa-random"></i>
                </div>
                <h3>Todas Embaralhadas</h3>
                <p>Quiz completo da macroárea</p>
            </div>
            
            ${macroArea.subdivisoes[Object.keys(macroArea.subdivisoes)[0]].audioFile ? `
                <div class="menu-card" onclick="showAudioAulas('${macroKey}')">
                    <div class="card-icon" style="background: ${macroArea.color}">
                        <i class="fas fa-headphones"></i>
                    </div>
                    <h3>Áudio Aulas</h3>
                    <p>Material em áudio</p>
                </div>
            ` : ''}
        </div>
    `;
}

function getSubdivisaoProgress(subdivKey) {
    const score = userProgress.scores[subdivKey];
    if (!score) {
        return '<small style="color: var(--text-light);">Não iniciado</small>';
    }
    
    const percentage = Math.round((score.correct / score.total) * 100);
    const color = percentage >= 70 ? 'var(--success-color)' : 
                  percentage >= 50 ? 'var(--warning-color)' : 'var(--danger-color)';
    
    return `
        <div style="margin-top: 10px; padding: 5px 10px; background: rgba(102, 126, 234, 0.1); border-radius: 5px;">
            <small style="color: ${color}; font-weight: 600;">
                Melhor: ${percentage}% (${score.correct}/${score.total})
            </small>
        </div>
    `;
}

// ==================== QUIZ SYSTEM ====================
function startQuiz(macroKey, subdivKey) {
    const macroArea = ropsData[macroKey];
    let questions = [];
    
    if (subdivKey === 'all') {
        // Get all questions from all subdivisions
        Object.values(macroArea.subdivisoes).forEach(subdiv => {
            questions = questions.concat(subdiv.questions);
        });
    } else {
        questions = macroArea.subdivisoes[subdivKey].questions;
    }
    
    // Shuffle questions
    questions = shuffleArray([...questions]);
    
    currentQuiz = {
        macroKey,
        subdivKey,
        questions,
        currentIndex: 0,
        score: 0,
        answers: [],
        startTime: Date.now()
    };
    
    showQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showQuestion() {
    const screen = document.getElementById('quizScreen');
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    
    screen.innerHTML = `
        <button class="back-btn" onclick="confirmQuitQuiz()">
            <i class="fas fa-times"></i> Sair do Quiz
        </button>
        
        <div class="quiz-container">
            <div class="quiz-header">
                <div class="quiz-progress">
                    Questão ${currentQuiz.currentIndex + 1} de ${currentQuiz.questions.length}
                </div>
                <div class="quiz-score">
                    <i class="fas fa-star"></i> ${currentQuiz.score} pontos
                </div>
            </div>
            
            <div class="question-container">
                <div class="question-text">
                    ${question.question}
                </div>
                
                <div class="options-container" id="optionsContainer">
                    ${question.options.map((option, index) => `
                        <button class="option-btn" onclick="selectAnswer(${index})">
                            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                            <span>${option}</span>
                        </button>
                    `).join('')}
                </div>
                
                <div id="explanationContainer"></div>
            </div>
            
            <div class="quiz-controls" id="quizControls">
                <button class="btn-quiz btn-show-explanation" onclick="showExplanation()" style="display: none;" id="btnExplanation">
                    <i class="fas fa-lightbulb"></i> Ver Explicação
                </button>
                <button class="btn-quiz btn-next" onclick="nextQuestion()" style="display: none;" id="btnNext">
                    Próxima <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
    
    showScreen('quiz');
}

function selectAnswer(selectedIndex) {
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    const options = document.querySelectorAll('.option-btn');
    const isCorrect = selectedIndex === question.correctAnswer;
    
    // Disable all options
    options.forEach((btn, index) => {
        btn.classList.add('disabled');
        btn.onclick = null;
        
        if (index === question.correctAnswer) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            btn.classList.add('wrong');
        }
    });
    
    // Update score
    if (isCorrect) {
        currentQuiz.score += 10;
        currentQuiz.answers.push({ questionIndex: currentQuiz.currentIndex, correct: true });
        showToast('Resposta correta! +10 pontos', 'success');
    } else {
        currentQuiz.answers.push({ questionIndex: currentQuiz.currentIndex, correct: false });
        showToast('Resposta incorreta. Veja a explicação.', 'error');
    }
    
    // Show controls
    document.getElementById('btnExplanation').style.display = 'flex';
    document.getElementById('btnNext').style.display = 'flex';
    
    // Update score display
    document.querySelector('.quiz-score').innerHTML = `
        <i class="fas fa-star"></i> ${currentQuiz.score} pontos
    `;
}

function showExplanation() {
    const question = currentQuiz.questions[currentQuiz.currentIndex];
    const container = document.getElementById('explanationContainer');
    
    container.innerHTML = `
        <div class="explanation-container">
            <h4><i class="fas fa-lightbulb"></i> Explicação</h4>
            <p>${question.explanation}</p>
        </div>
    `;
    
    document.getElementById('btnExplanation').style.display = 'none';
}

function nextQuestion() {
    currentQuiz.currentIndex++;
    
    if (currentQuiz.currentIndex < currentQuiz.questions.length) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function confirmQuitQuiz() {
    if (confirm('Deseja realmente sair do quiz? Seu progresso será perdido.')) {
        showROPs();
    }
}

async function finishQuiz() {
    const totalQuestions = currentQuiz.questions.length;
    const correctAnswers = currentQuiz.answers.filter(a => a.correct).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const timeSpent = Math.round((Date.now() - currentQuiz.startTime) / 1000);
    
    // Update user progress
    if (!userProgress.scores[currentQuiz.subdivKey] || 
        percentage > (userProgress.scores[currentQuiz.subdivKey].percentage || 0)) {
        userProgress.scores[currentQuiz.subdivKey] = {
            correct: correctAnswers,
            total: totalQuestions,
            percentage: percentage,
            date: new Date().toISOString()
        };
    }
    
    if (percentage >= 70 && !userProgress.completedTopics.includes(currentQuiz.subdivKey)) {
        userProgress.completedTopics.push(currentQuiz.subdivKey);
    }
    
    userProgress.totalPoints += currentQuiz.score;
    
    // Save to Firestore
    await saveUserProgress();
    await saveQuizResult(correctAnswers, totalQuestions, percentage, timeSpent);
    
    // Show results
    showResults(correctAnswers, totalQuestions, percentage, timeSpent);
}

async function saveQuizResult(correct, total, percentage, timeSpent) {
    try {
        await db.collection('quiz_results').add({
            userId: currentUser.uid,
            userName: currentUser.displayName || currentUser.email,
            macroKey: currentQuiz.macroKey,
            subdivKey: currentQuiz.subdivKey,
            correct: correct,
            total: total,
            percentage: percentage,
            score: currentQuiz.score,
            timeSpent: timeSpent,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Erro ao salvar resultado:', error);
    }
}

function showResults(correct, total, percentage, timeSpent) {
    const screen = document.getElementById('resultsScreen');
    
    const resultClass = percentage >= 80 ? 'excellent' : 
                        percentage >= 60 ? 'good' : 'needs-improvement';
    
    const resultIcon = percentage >= 80 ? 'fa-trophy' : 
                       percentage >= 60 ? 'fa-smile' : 'fa-book';
    
    const resultMessage = percentage >= 80 ? 'Excelente desempenho!' : 
                          percentage >= 60 ? 'Bom trabalho!' : 'Continue estudando!';
    
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    
    screen.innerHTML = `
        <div class="results-container">
            <div class="results-icon ${resultClass}">
                <i class="fas ${resultIcon}"></i>
            </div>
            
            <div class="results-score">${percentage}%</div>
            <div class="results-message">${resultMessage}</div>
            
            <div class="results-stats">
                <div class="stat-item">
                    <span class="stat-value">${correct}</span>
                    <span class="stat-label">Acertos</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${total - correct}</span>
                    <span class="stat-label">Erros</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${currentQuiz.score}</span>
                    <span class="stat-label">Pontos</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${minutes}:${seconds.toString().padStart(2, '0')}</span>
                    <span class="stat-label">Tempo</span>
                </div>
            </div>
            
            <div class="quiz-controls">
                <button class="btn-quiz btn-next" onclick="showROPs()">
                    <i class="fas fa-home"></i> Voltar
                </button>
                <button class="btn-quiz btn-next" onclick="startQuiz('${currentQuiz.macroKey}', '${currentQuiz.subdivKey}')">
                    <i class="fas fa-redo"></i> Refazer
                </button>
            </div>
            
            <button class="btn-primary" onclick="showRanking()" style="margin-top: 20px;">
                <i class="fas fa-trophy"></i> Ver Ranking
            </button>
        </div>
    `;
    
    showScreen('results');
}

// ==================== RANKING ====================
async function showRanking() {
    const screen = document.getElementById('rankingScreen');
    
    screen.innerHTML = `
        <button class="back-btn" onclick="showROPs()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        
        <div class="ranking-container">
            <h2 style="text-align: center; color: var(--text-dark); margin-bottom: 30px;">
                <i class="fas fa-trophy" style="color: #FFD700;"></i> Ranking Geral
            </h2>
            
            <div class="ranking-tabs">
                <button class="tab-btn active" onclick="loadRanking('geral')">
                    Geral
                </button>
                <button class="tab-btn" onclick="loadRanking('mensal')">
                    Mensal
                </button>
                <button class="tab-btn" onclick="loadRanking('semanal')">
                    Semanal
                </button>
            </div>
            
            <div id="rankingContent">
                <div style="text-align: center; padding: 40px;">
                    <div class="loader" style="margin: 0 auto;"></div>
                </div>
            </div>
        </div>
    `;
    
    showScreen('ranking');
    loadRanking('geral');
}

async function loadRanking(period) {
    const content = document.getElementById('rankingContent');
    content.innerHTML = '<div style="text-align: center; padding: 40px;"><div class="loader" style="margin: 0 auto;"></div></div>';
    
    try {
        // Get top users
        let query = db.collection('users')
            .orderBy('totalPoints', 'desc')
            .limit(50);
        
        if (period !== 'geral') {
            const date = new Date();
            if (period === 'mensal') {
                date.setMonth(date.getMonth() - 1);
            } else {
                date.setDate(date.getDate() - 7);
            }
            query = query.where('lastUpdate', '>=', date);
        }
        
        const snapshot = await query.get();
        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        
        if (users.length === 0) {
            content.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 40px;">Nenhum usuário encontrado.</p>';
            return;
        }
        
        content.innerHTML = `
            <table class="ranking-table">
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Nome</th>
                        <th>Pontos</th>
                        <th>Tópicos Completos</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map((user, index) => {
                        const isCurrentUser = user.id === currentUser.uid;
                        const positionClass = index === 0 ? 'gold' : 
                                             index === 1 ? 'silver' : 
                                             index === 2 ? 'bronze' : 'regular';
                        
                        return `
                            <tr style="${isCurrentUser ? 'background: rgba(102, 126, 234, 0.1); font-weight: 600;' : ''}">
                                <td>
                                    <div class="ranking-position ${positionClass}">
                                        ${index < 3 ? '<i class="fas fa-trophy"></i>' : (index + 1)}
                                    </div>
                                </td>
                                <td>
                                    ${user.name || user.email}
                                    ${isCurrentUser ? '<i class="fas fa-user" style="color: var(--primary-color); margin-left: 10px;"></i>' : ''}
                                </td>
                                <td>
                                    <strong style="color: var(--primary-color);">${user.totalPoints || 0}</strong>
                                </td>
                                <td>${(user.completedTopics || []).length}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Erro ao carregar ranking:', error);
        content.innerHTML = '<p style="text-align: center; color: var(--danger-color); padding: 40px;">Erro ao carregar ranking.</p>';
    }
}

// ==================== SIMULADO ====================
function showSimulado() {
    const allQuestions = [];
    
    // Collect 50 random questions from all ROPs
    Object.values(ropsData).forEach(macroArea => {
        Object.values(macroArea.subdivisoes).forEach(subdiv => {
            allQuestions.push(...subdiv.questions);
        });
    });
    
    // Shuffle and take 50
    const selectedQuestions = shuffleArray(allQuestions).slice(0, Math.min(50, allQuestions.length));
    
    currentQuiz = {
        macroKey: 'simulado',
        subdivKey: 'simulado',
        questions: selectedQuestions,
        currentIndex: 0,
        score: 0,
        answers: [],
        startTime: Date.now()
    };
    
    showQuestion();
}

// ==================== OTHER SECTIONS ====================
function showResidencia() {
    const screen = document.getElementById('residenciaScreen');
    screen.innerHTML = `
        <button class="back-btn" onclick="goHome()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">Residência Médica</h2>
        
        <div class="menu-grid">
            <div class="menu-card">
                <div class="card-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                    <i class="fas fa-chalkboard-teacher"></i>
                </div>
                <h3>Aulas</h3>
                <p>Material didático e apresentações</p>
            </div>
            
            <div class="menu-card">
                <div class="card-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
                    <i class="fas fa-newspaper"></i>
                </div>
                <h3>Artigos</h3>
                <p>Artigos científicos relevantes</p>
            </div>
            
            <div class="menu-card">
                <div class="card-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
                    <i class="fas fa-calendar-alt"></i>
                </div>
                <h3>Escalas</h3>
                <p>Escalas de plantão e atividades</p>
            </div>
            
            <div class="menu-card">
                <div class="card-icon" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
                    <i class="fas fa-hospital"></i>
                </div>
                <h3>Estágios</h3>
                <p>Informações sobre estágios</p>
            </div>
            
            <div class="menu-card">
                <div class="card-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%)">
                    <i class="fas fa-umbrella-beach"></i>
                </div>
                <h3>Férias</h3>
                <p>Programação de férias</p>
            </div>
        </div>
        
        <div style="background: white; border-radius: 20px; padding: 40px; margin-top: 30px; text-align: center;">
            <i class="fas fa-info-circle" style="font-size: 48px; color: var(--primary-color); margin-bottom: 20px;"></i>
            <h3 style="color: var(--text-dark); margin-bottom: 10px;">Seção em Desenvolvimento</h3>
            <p style="color: var(--text-light);">
                O conteúdo desta seção será adicionado em breve. Entre em contato com a administração para mais informações.
            </p>
        </div>
    `;
    showScreen('residencia');
}

function showProtocolos() {
    showDocumentsSection('protocolos', 'Protocolos', 'file-medical', documentsData.protocolos);
}

function showPoliticas() {
    showDocumentsSection('politicas', 'Políticas', 'shield-alt', documentsData.politicas);
}

function showFormularios() {
    showDocumentsSection('formularios', 'Formulários', 'clipboard-list', documentsData.formularios);
}

function showManuais() {
    showDocumentsSection('manuais', 'Manuais', 'book', documentsData.manuais);
}

function showRelatorios() {
    showDocumentsSection('relatorios', 'Relatórios de Segurança', 'chart-line', documentsData.relatorios);
}

function showProcessos() {
    showDocumentsSection('processos', 'Mapeamento de Processos', 'project-diagram', documentsData.processos);
}

function showRiscos() {
    showDocumentsSection('riscos', 'Mapeamento de Riscos', 'exclamation-triangle', documentsData.riscos);
}

function showTermos() {
    showGenericSection('termos', 'Termos', 'file-contract', 'Termos de consentimento e documentos legais.');
}

function showClima() {
    showGenericSection('clima', 'Clima de Segurança', 'temperature-high', 'Relatórios de clima organizacional de segurança.');
}

function showPlanoSeguranca() {
    showDocumentsSection('planoSeguranca', 'Plano de Segurança do Paciente', 'clipboard-check', documentsData.planoSeguranca);
}

function showGenericSection(sectionKey, title, icon, description) {
    const screen = document.getElementById(sectionKey + 'Screen');
    screen.innerHTML = `
        <button class="back-btn" onclick="goHome()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">${title}</h2>
        
        <div style="background: white; border-radius: 20px; padding: 40px; text-align: center; max-width: 600px; margin: 0 auto;">
            <i class="fas fa-${icon}" style="font-size: 64px; color: var(--primary-color); margin-bottom: 20px;"></i>
            <h3 style="color: var(--text-dark); margin-bottom: 15px;">${title}</h3>
            <p style="color: var(--text-light); margin-bottom: 30px;">
                ${description}
            </p>
            <div style="background: var(--bg-light); border-radius: 10px; padding: 20px;">
                <i class="fas fa-folder-open" style="font-size: 48px; color: var(--text-light); margin-bottom: 10px;"></i>
                <p style="color: var(--text-light);">
                    Nenhum documento disponível no momento.<br>
                    Os arquivos serão carregados em breve.
                </p>
            </div>
        </div>
    `;
    showScreen(sectionKey);
}

function showProfile() {
    alert('Perfil do usuário - Em desenvolvimento');
}

// ==================== DOCUMENTS SECTION ====================
function showDocumentsSection(sectionKey, title, icon, documents) {
    const screen = document.getElementById(sectionKey + 'Screen');
    
    if (!documents || documents.length === 0) {
        screen.innerHTML = `
            <button class="back-btn" onclick="goHome()">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2 class="screen-title">${title}</h2>
            
            <div class="documents-container">
                <div class="empty-state">
                    <i class="fas fa-${icon}"></i>
                    <h3>Nenhum documento disponível</h3>
                    <p>Os arquivos serão adicionados em breve.</p>
                </div>
            </div>
        `;
    } else {
        // Get unique categories
        const categories = [...new Set(documents.map(d => d.categoria || d.tipo).filter(Boolean))];
        
        screen.innerHTML = `
            <button class="back-btn" onclick="goHome()">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2 class="screen-title">${title}</h2>
            
            <div class="documents-container">
                <div style="margin-bottom: 20px;">
                    <p style="color: var(--text-light); margin-bottom: 10px;">
                        <i class="fas fa-info-circle"></i> Total: ${documents.length} documento${documents.length > 1 ? 's' : ''}
                    </p>
                </div>
                
                ${categories.length > 1 ? `
                    <div class="category-filter">
                        <button class="filter-btn active" onclick="filterDocuments('${sectionKey}', 'all')">
                            Todos (${documents.length})
                        </button>
                        ${categories.map(cat => `
                            <button class="filter-btn" onclick="filterDocuments('${sectionKey}', '${cat}')">
                                ${cat} (${documents.filter(d => (d.categoria || d.tipo) === cat).length})
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="documents-grid" id="${sectionKey}DocumentsGrid">
                    ${documents.map(doc => {
                        const fileExtension = doc.file.split('.').pop().toUpperCase();
                        const iconClass = fileExtension === 'PDF' ? 'fa-file-pdf' : 
                                        fileExtension === 'DOCX' ? 'fa-file-word' : 
                                        fileExtension === 'ODT' ? 'fa-file-alt' : 'fa-file';
                        
                        return `
                            <div class="document-item" onclick="openDocument('${doc.file.replace(/'/g, "\\'")}', '${doc.title.replace(/'/g, "\\'")}')">
                                <div class="document-icon">
                                    <i class="fas ${iconClass}"></i>
                                </div>
                                <div class="document-info">
                                    <div class="document-title">${doc.title}</div>
                                    <div class="document-meta">
                                        ${doc.codigo ? `<span class="document-badge">${doc.codigo}</span>` : ''}
                                        ${doc.categoria ? `<span class="document-badge">${doc.categoria}</span>` : ''}
                                        ${doc.tipo ? `<span class="document-badge">${doc.tipo}</span>` : ''}
                                        ${doc.periodo ? `<span class="document-badge">${doc.periodo}</span>` : ''}
                                        ${doc.ano ? `<span class="document-badge">${doc.ano}</span>` : ''}
                                    </div>
                                </div>
                                <i class="fas fa-external-link-alt" style="color: var(--primary-color);"></i>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    showScreen(sectionKey);
}

function filterDocuments(sectionKey, category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const documents = documentsData[sectionKey];
    const grid = document.getElementById(sectionKey + 'DocumentsGrid');
    
    const filtered = category === 'all' ? documents : 
                     documents.filter(d => (d.categoria || d.tipo) === category);
    
    grid.innerHTML = filtered.map(doc => {
        const fileExtension = doc.file.split('.').pop().toUpperCase();
        const iconClass = fileExtension === 'PDF' ? 'fa-file-pdf' : 
                        fileExtension === 'DOCX' ? 'fa-file-word' : 
                        fileExtension === 'ODT' ? 'fa-file-alt' : 'fa-file';
        
        return `
            <div class="document-item" onclick="openDocument('${doc.file.replace(/'/g, "\\'")}', '${doc.title.replace(/'/g, "\\'")}')">
                <div class="document-icon">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="document-info">
                    <div class="document-title">${doc.title}</div>
                    <div class="document-meta">
                        ${doc.codigo ? `<span class="document-badge">${doc.codigo}</span>` : ''}
                        ${doc.categoria ? `<span class="document-badge">${doc.categoria}</span>` : ''}
                        ${doc.tipo ? `<span class="document-badge">${doc.tipo}</span>` : ''}
                        ${doc.periodo ? `<span class="document-badge">${doc.periodo}</span>` : ''}
                        ${doc.ano ? `<span class="document-badge">${doc.ano}</span>` : ''}
                    </div>
                </div>
                <i class="fas fa-external-link-alt" style="color: var(--primary-color);"></i>
            </div>
        `;
    }).join('');
}

function openDocument(filePath, title) {
    // Try to open in new tab
    const link = document.createElement('a');
    link.href = filePath;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = title;
    
    try {
        link.click();
        showToast(`Abrindo: ${title}`, 'info');
    } catch (error) {
        showToast('Erro ao abrir documento. Verifique se o arquivo existe.', 'error');
        console.error('Erro ao abrir documento:', error);
    }
}

// ==================== PODCASTS ROPS ====================
function showPodcastsROPs() {
    const screen = document.getElementById('podcastsScreen');
    
    screen.innerHTML = `
        <button class="back-btn" onclick="goHome()">
            <i class="fas fa-arrow-left"></i> Voltar
        </button>
        <h2 class="screen-title">Podcasts ROPs - Áudio Aulas</h2>
        
        <div class="menu-grid">
            ${Object.entries(podcastsData).map(([key, macroArea]) => {
                const audioCount = macroArea.audios.length;
                return `
                    <div class="menu-card" onclick="showPodcastMacroArea('${key}')">
                        <div class="card-icon" style="background: ${macroArea.color}">
                            <i class="${macroArea.icon}"></i>
                        </div>
                        <h3>${macroArea.title}</h3>
                        <p>${audioCount} áudio${audioCount !== 1 ? 's' : ''} disponível${audioCount !== 1 ? 'is' : ''}</p>
                    </div>
                `;
            }).join('')}
        </div>
    `;
    
    showScreen('podcasts');
}

function showPodcastMacroArea(macroKey) {
    const macroArea = podcastsData[macroKey];
    const screen = document.getElementById('podcastsScreen');
    
    if (!macroArea.audios || macroArea.audios.length === 0) {
        screen.innerHTML = `
            <button class="back-btn" onclick="showPodcastsROPs()">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2 class="screen-title">${macroArea.title}</h2>
            
            <div class="documents-container">
                <div class="no-audios-message">
                    <i class="fas fa-microphone-slash"></i>
                    <h3>Nenhuma áudio aula disponível ainda</h3>
                    <p style="margin-top: 10px;">As áudio aulas desta macroárea serão adicionadas em breve.</p>
                </div>
            </div>
        `;
    } else {
        screen.innerHTML = `
            <button class="back-btn" onclick="showPodcastsROPs()">
                <i class="fas fa-arrow-left"></i> Voltar
            </button>
            <h2 class="screen-title">${macroArea.title}</h2>
            
            <div class="documents-container">
                <div style="margin-bottom: 30px; text-align: center;">
                    <p style="color: var(--text-light);">
                        <i class="fas fa-headphones"></i> ${macroArea.audios.length} áudio${macroArea.audios.length > 1 ? 's' : ''} disponível${macroArea.audios.length > 1 ? 'is' : ''}
                    </p>
                </div>
                
                ${macroArea.audios.map((audio, index) => `
                    <div class="audio-player-container">
                        <div class="audio-player-header">
                            <div class="audio-player-icon" style="background: ${macroArea.color}">
                                <i class="fas fa-play"></i>
                            </div>
                            <div class="audio-player-info">
                                <div class="audio-player-title">${audio.title}</div>
                                <div class="audio-player-description">${audio.descricao}</div>
                            </div>
                        </div>
                        <div class="audio-player-controls">
                            <audio controls preload="metadata">
                                <source src="${audio.file}" type="audio/mp4">
                                <source src="${audio.file}" type="audio/m4a">
                                Seu navegador não suporta o elemento de áudio.
                            </audio>
                        </div>
                    </div>
                `).join('')}
                
                <div style="margin-top: 30px; padding: 20px; background: var(--bg-light); border-radius: 15px;">
                    <h4 style="color: var(--text-dark); margin-bottom: 10px;">
                        <i class="fas fa-info-circle"></i> Dicas de Uso
                    </h4>
                    <ul style="color: var(--text-light); padding-left: 20px;">
                        <li>Use fones de ouvido para melhor experiência</li>
                        <li>Você pode ajustar a velocidade de reprodução no player</li>
                        <li>Os áudios ficam salvos para ouvir offline no navegador</li>
                        <li>Recomendamos ouvir em um ambiente tranquilo</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    showScreen('podcasts');
}

console.log('App initialized successfully!');

