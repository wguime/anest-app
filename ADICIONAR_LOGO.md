# 🎨 Como Adicionar a Logo ANEST

## 📋 Instruções

Para adicionar a logo da ANEST no aplicativo:

### 1. **Prepare a Imagem**
- A logo deve estar em formato **PNG** ou **JPG**
- Fundo transparente é recomendado (PNG)
- Tamanho sugerido: **altura de 100-200px**

### 2. **Salve o Arquivo**
Copie a logo para o diretório raiz do projeto com o nome:
```
logo-anest.png
```

ou use o comando:
```bash
cp "caminho/para/sua/logo.png" /Users/guilherme/Documents/Qmentum/logo-anest.png
```

### 3. **Faça o Upload para o GitHub**
```bash
cd /Users/guilherme/Documents/Qmentum
git add logo-anest.png
git commit -m "feat: Adicionar logo ANEST"
git push origin main
```

### 4. **Aguarde**
- O GitHub Pages atualizará automaticamente (1-2 minutos)
- A logo aparecerá no header do aplicativo
- Se a logo não carregar, o sistema mostrará o ícone de coração + texto "ANEST" como fallback

---

## ✅ O que já está pronto

O código HTML e CSS já estão preparados:
- ✅ Tag `<img>` configurada em `index.html`
- ✅ Estilos CSS para `.logo-img` definidos
- ✅ Fallback automático caso a logo não carregue
- ✅ Altura fixa de 50px (responsivo)
- ✅ Logo centralizada verticalmente no header

---

## 🖼️ Referência Visual

A logo ficará posicionada assim:

```
┌─────────────────────────────────────┐
│  [LOGO]  ANEST    🌙  👤  🚪       │ ← Header
└─────────────────────────────────────┘
```

Altura: **50px**  
Posição: **Canto esquerdo do header**  
Ao lado: **Botão Dark Mode, Nome do Usuário, Perfil, Sair**

---

## ⚠️ Importante

- O arquivo deve se chamar **exatamente** `logo-anest.png` (sem espaços)
- Deve estar no **diretório raiz** do projeto
- Não na pasta `App/` ou qualquer subpasta
- Se usar outro formato (JPG), ajuste o nome no `index.html` linha 91

---

**Qualquer dúvida, é só avisar!** 🚀

