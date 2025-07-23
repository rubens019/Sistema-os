# 🚀 Guia de Deploy no Vercel - Sistema OS Tivoli

## ✅ Status do Projeto
- ✅ Build funcionando corretamente
- ✅ Configuração do Vercel (`vercel.json`) criada
- ✅ Variáveis de ambiente documentadas
- ✅ .gitignore atualizado
- ✅ README.md com instruções completas

## 🔧 Arquivos de Configuração Criados

### 1. `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 2. `.env.example`
Arquivo com as variáveis de ambiente necessárias para configurar no Vercel.

## 🚀 Passos para Deploy

### Método 1: Via Interface Web do Vercel (Mais Fácil)

1. **Acesse**: https://vercel.com
2. **Faça login** com sua conta GitHub
3. **Clique em "New Project"**
4. **Importe o repositório** do GitHub
5. **Configure as variáveis de ambiente**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. **Deploy automático** - O Vercel detectará automaticamente as configurações

### Método 2: Via Vercel CLI

```bash
# 1. Instale o Vercel CLI globalmente
npm install -g vercel

# 2. Faça login no Vercel
vercel login

# 3. No diretório do projeto, execute:
vercel

# 4. Para deploy de produção:
vercel --prod
```

## 🔑 Configuração das Variáveis de Ambiente

### No Painel do Vercel:
1. Acesse o dashboard do projeto
2. Vá em **Settings** > **Environment Variables**
3. Adicione:
   - **Name**: `VITE_SUPABASE_URL`
   - **Value**: Sua URL do Supabase (ex: https://xyzcompany.supabase.co)
   
   - **Name**: `VITE_SUPABASE_ANON_KEY`
   - **Value**: Sua chave anônima do Supabase

4. **Importante**: Após adicionar as variáveis, faça um novo deploy

## 📋 Checklist Pré-Deploy

- ✅ Projeto commitado no GitHub
- ✅ Variáveis de ambiente do Supabase prontas
- ✅ Build local funcionando (`npm run build`)
- ✅ Conta no Vercel criada
- ✅ Repositório público ou conta Pro do Vercel

## 🔍 Verificações Pós-Deploy

1. **Teste a aplicação** na URL fornecida pelo Vercel
2. **Verifique o login** com usuários do Supabase
3. **Teste as funcionalidades principais**:
   - Login/Logout
   - Criação de OS
   - Listagem de equipamentos
   - Relatórios

## 🆘 Solução de Problemas

### Build Falha
- Verifique se todas as dependências estão no `package.json`
- Confirme se o comando `npm run build` funciona localmente

### Variáveis de Ambiente
- Certifique-se de que começam com `VITE_`
- Verifique se foram adicionadas no painel do Vercel
- Faça um novo deploy após adicionar as variáveis

### Erro 404 em Rotas
- O `vercel.json` já está configurado para SPA
- Se persistir, verifique se o arquivo foi commitado

## 📞 Suporte
- Documentação Vercel: https://vercel.com/docs
- Documentação Vite: https://vitejs.dev/guide/
- Documentação Supabase: https://supabase.com/docs