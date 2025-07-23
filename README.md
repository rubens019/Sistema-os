# Sistema OS Tivoli - BS TEC

Sistema de gerenciamento de ordens de serviço desenvolvido para a BS TEC.

## 🚀 Funcionalidades

- **Gestão de Ordens de Serviço**: Criação, edição e acompanhamento de OS
- **Sistema de Garantia**: Criação automática de OS de garantia
- **Relatórios e Dashboard**: Métricas e análises detalhadas
- **Gestão de Clientes**: Cadastro e gerenciamento de clientes
- **Sistema de Usuários**: Controle de acesso por cargo (Gerência, Vendedor, Técnico, Master)
- **Impressão de Documentos**: Geração de PDFs para OS e termos de garantia

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React + Vite
- **UI Components**: Tailwind CSS + Shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Autenticação**: Sistema customizado com Supabase
- **PDF Generation**: React-PDF
- **Charts**: Recharts

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Supabase

## 🚀 Deploy no Vercel

### Pré-requisitos para Deploy
1. Conta no [Vercel](https://vercel.com)
2. Projeto no GitHub (recomendado)
3. Configuração do Supabase

### Passos para Deploy

#### Opção 1: Deploy via GitHub (Recomendado)
1. **Faça push do projeto para o GitHub**
2. **Acesse o Vercel**: https://vercel.com
3. **Importe o projeto**:
   - Clique em "New Project"
   - Conecte sua conta GitHub
   - Selecione o repositório do projeto
4. **Configure as variáveis de ambiente**:
   - `VITE_SUPABASE_URL`: URL do seu projeto Supabase
   - `VITE_SUPABASE_ANON_KEY`: Chave anônima do Supabase
5. **Deploy automático**: O Vercel detectará automaticamente que é um projeto Vite

#### Opção 2: Deploy via Vercel CLI
```bash
# Instale o Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel

# Para deploy de produção
vercel --prod
```

### Configuração de Variáveis de Ambiente no Vercel
1. Acesse o dashboard do projeto no Vercel
2. Vá em "Settings" > "Environment Variables"
3. Adicione as variáveis:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Faça um novo deploy para aplicar as mudanças

### Configurações Importantes
- ✅ `vercel.json` configurado para SPA (Single Page Application)
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Node.js version: 18.x (padrão do Vercel)

## 👥 Tipos de Usuário

- **Gerência**: Acesso completo ao dashboard e relatórios
- **Vendedor**: Gestão de OS e clientes
- **Técnico**: Gestão de OS técnicas
- **Master**: Acesso completo ao sistema

## 📊 Estrutura do Banco de Dados

O sistema utiliza as seguintes tabelas principais:
- `Ordem de serviço`: Dados das ordens de serviço
- `sistema_usuarios`: Usuários do sistema
- `historico_pedidos_os`: Histórico de alterações

## 🔒 Segurança

- Autenticação baseada em sessão
- Controle de acesso por cargo
- Validação de dados no frontend e backend

## 📝 Changelog

### Versão Atual
- ✅ Correção do sistema de garantia
- ✅ Correção do problema de login duplo
- ✅ Filtro de registros "Encerrado" por padrão
- ✅ Melhorias na interface e usabilidade

## 🤝 Contribuição

Este é um projeto privado da BS TEC. Para contribuições, entre em contato com a equipe de desenvolvimento.

## 📄 Licença

Propriedade da BS TEC. Todos os direitos reservados.