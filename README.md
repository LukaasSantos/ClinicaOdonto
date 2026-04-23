# Clínica Sorriso Perfeito - Landing Page

Landing page moderna e responsiva para clínica odontológica com foco em agendamento via WhatsApp.

## 🚀 Funcionalidades

- ✅ Design responsivo com Bootstrap 5
- ✅ Agendamento direto via WhatsApp
- ✅ Animações suaves com AOS (Animate On Scroll)
- ✅ Performance otimizada
- ✅ Interface moderna e profissional
- ✅ WhatsApp flutuante com pulse animation
- ✅ Navegação suave entre seções
- ✅ Mensagens personalizadas baseadas no horário
- ✅ Fallback de animações (funciona mesmo se AOS falhar)

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos personalizados com variáveis CSS
- **JavaScript** - Interatividade e otimizações
- **Bootstrap 5** - Framework CSS responsivo
- **AOS** - Animações ao scroll
- **Font Awesome** - Ícones profissionais

## 📁 Estrutura do Projeto

```
windsurf-project/
├── index.html          # Página principal
├── style.css           # Estilos personalizados
├── script.js           # Funcionalidades JavaScript
├── manifest.json       # Configuração PWA
├── sw.js              # Service Worker para cache
└── README.md           # Documentação
```

## 🎨 Personalização

### Alterar Número do WhatsApp
Substitua `5511999999999` pelo seu número de WhatsApp nos seguintes locais:
- Todos os links `href="https://wa.me/5511999999999"`
- Mensagens personalizadas no `script.js`

### Cores da Marca
Edite as variáveis CSS no `style.css`:
```css
:root {
    --primary-color: #00D9FF;
    --secondary-color: #00B8E6;
    --accent-color: #FF6B6B;
    --whatsapp-color: #25D366;
}
```

### Informações da Clínica
Atualize no `index.html`:
- Nome da clínica
- Endereço e contato
- Serviços oferecidos
- Depoimentos de clientes

## 📱 Funcionalidades Principais

### 1. Agendamento WhatsApp
- Botões estratégicos em toda a página
- Mensagens personalizadas por serviço
- WhatsApp flutuante sempre visível
- Resposta automática de loading

### 2. Animações
- Scroll animations com AOS
- Fallback CSS animations se AOS falhar
- Hover effects em cards
- Transições suaves

### 3. Performance
- Lazy loading de imagens
- Debounce em eventos scroll
- Preload de recursos críticos
- Código otimizado

## 🔧 Solução de Problemas

### Animações não funcionam?
O projeto inclui fallback automático:
1. Verifica se AOS está carregado
2. Se não, usa animações CSS puras
3. Força animações após 1 segundo
4. Console logs para debug

### Debug no Console
Abra o console do navegador (F12) para ver:
- `AOS initialized successfully` - AOS funcionando
- `AOS library not loaded` - Fallback ativado
- `Found X elements with data-aos attributes` - Elementos encontrados

## 🌐 SEO e Meta Tags

A página inclui:
- Meta description otimizada
- Keywords relevantes
- Open Graph tags
- Estrutura semântica HTML5
- URLs amigáveis

## 📊 Analytics

O código está preparado para:
- Google Analytics integration
- Event tracking em cliques WhatsApp
- Monitoramento de conversões

## 🚀 Deploy

### Para produção:
1. Suba os arquivos para seu servidor
2. Configure o domínio
3. Atualize o número do WhatsApp
4. Teste todos os links

### Otimizações adicionais:
- Minificar CSS e JavaScript
- Comprimir imagens
- Configurar cache
- Implementar CDN

## 🔄 PWA Features

A página é uma PWA (Progressive Web App):
- Instalável em dispositivos móveis
- Funciona offline com cache
- Ícone personalizado
- Theme color configurado

## 🔧 Personalização Avançada

### Adicionar Novos Serviços
```html
<div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="500">
    <div class="card service-card h-100 border-0 shadow-sm">
        <div class="card-body text-center p-4">
            <div class="service-icon mb-3">
                <i class="fas fa-icon-name fa-3x text-primary"></i>
            </div>
            <h5 class="card-title">Nome do Serviço</h5>
            <p class="card-text text-muted">Descrição do serviço</p>
            <a href="https://wa.me/5511999999999?text=Mensagem personalizada" 
               class="btn btn-outline-primary btn-sm" target="_blank">
                Agendar
            </a>
        </div>
    </div>
</div>
```

### Modificar Animações
```javascript
// No script.js
AOS.init({
    duration: 800,    // Duração da animação
    once: true,       // Animar apenas uma vez
    offset: 100,      // Distância para ativar
    easing: 'ease-in-out' // Tipo de easing
});
```

## 📱 Compatibilidade

- ✅ Chrome (últimas 2 versões)
- ✅ Firefox (últimas 2 versões)
- ✅ Safari (últimas 2 versões)
- ✅ Edge (últimas 2 versões)
- ✅ iOS Safari 12+
- ✅ Chrome Mobile

## 🔄 Manutenção

### Atualizações recomendadas:
- Manter Bootstrap atualizado
- Revisar links WhatsApp mensalmente
- Atualizar depoimentos periodicamente
- Monitorar performance

## 📞 Suporte

Para dúvidas ou personalizações:
- Verificar console para erros
- Testar em diferentes dispositivos
- Validar HTML/CSS
- Monitorar velocidade de carregamento

## 🐛 Troubleshooting

### Problemas Comuns

1. **Animações não funcionam**
   - Verifique console para erros
   - Confirme se AOS está carregando
   - Fallback CSS deve ativar automaticamente

2. **Links WhatsApp não abrem**
   - Verifique o número de telefone
   - Confirme se não há bloqueador de pop-ups
   - Teste em navegador diferente

3. **Página não responsiva**
   - Verifique meta viewport tag
   - Teste em diferentes tamanhos de tela
   - Confirme Bootstrap CSS carregando

---

**Desenvolvido com ❤️ para clínicas odontológicas modernas**
