// Dados dos perfumes
const perfumes = [
    {
        id: 1,
        nome: "Essencial Ato",
        marca: "O Boticário",
        categoria: "feminino",
        preco: 89.90,
        imagem: "assets/images/perfumes/boticario_essencial.jpg",
        descricao: "Uma fragrância floral e envolvente que desperta os sentidos com sua elegância única.",
        notasTopo: "Bergamota, Pêra, Cassis",
        notasMeio: "Rosa, Jasmim, Peônia",
        notasFundo: "Âmbar, Almíscar, Madeira",
        avaliacao: 4.5,
        avaliacoes: 127,
        badge: "Bestseller"
    },
    {
        id: 2,
        nome: "Scandal Le Parfum",
        marca: "Jean Paul Gaultier",
        categoria: "feminino",
        preco: 299.90,
        imagem: "assets/images/perfumes/scandal_gaultier.jpg",
        descricao: "Uma fragrância provocante e sensual que marca presença onde quer que você vá.",
        notasTopo: "Mel, Gardênia, Pêra",
        notasMeio: "Jasmim, Tuberosa, Laranja",
        notasFundo: "Baunilha, Patchouli, Lírio",
        avaliacao: 4.8,
        avaliacoes: 89,
        badge: "Premium"
    },
    {
        id: 3,
        nome: "La Vie Est Belle",
        marca: "Lancôme",
        categoria: "feminino",
        preco: 349.90,
        imagem: "assets/images/perfumes/lancome_la_vie.jpg",
        descricao: "A vida é bela com esta fragrância doce e sofisticada que celebra a felicidade.",
        notasTopo: "Groselha Preta, Pêra",
        notasMeio: "Íris, Jasmim, Laranja",
        notasFundo: "Patchouli, Baunilha, Pralinê",
        avaliacao: 4.7,
        avaliacoes: 203,
        badge: "Luxo"
    },
    {
        id: 4,
        nome: "Homem",
        marca: "Natura",
        categoria: "masculino",
        preco: 79.90,
        imagem: "assets/images/perfumes/natura_homem.jpg",
        descricao: "Uma fragrância masculina clássica que expressa força e elegância natural.",
        notasTopo: "Limão, Bergamota, Menta",
        notasMeio: "Lavanda, Gerânio, Canela",
        notasFundo: "Sândalo, Cedro, Âmbar",
        avaliacao: 4.3,
        avaliacoes: 156,
        badge: "Clássico"
    },
    {
        id: 5,
        nome: "Unisex Signature",
        marca: "Fragrance One",
        categoria: "unissex",
        preco: 199.90,
        imagem: "assets/images/perfumes/unisex_fragrance.jpg",
        descricao: "Uma fragrância moderna e versátil que se adapta perfeitamente a qualquer personalidade.",
        notasTopo: "Bergamota, Rosa, Pimenta",
        notasMeio: "Oud, Jasmim, Especiarias",
        notasFundo: "Âmbar, Almíscar, Madeira",
        avaliacao: 4.6,
        avaliacoes: 94,
        badge: "Moderno"
    },
    {
        id: 6,
        nome: "Floratta Blue",
        marca: "O Boticário",
        categoria: "feminino",
        preco: 69.90,
        imagem: "assets/images/perfumes/boticario_essencial.jpg",
        descricao: "Uma fragrância fresca e delicada inspirada na beleza das flores azuis.",
        notasTopo: "Maçã Verde, Limão, Cassis",
        notasMeio: "Peônia, Rosa, Lírio",
        notasFundo: "Almíscar, Âmbar, Madeira",
        avaliacao: 4.2,
        avaliacoes: 78,
        badge: "Fresco"
    },
    {
        id: 7,
        nome: "Kaiak Masculino",
        marca: "Natura",
        categoria: "masculino",
        preco: 89.90,
        imagem: "assets/images/perfumes/natura_homem.jpg",
        descricao: "Uma fragrância aquática que transmite energia e vitalidade para o homem moderno.",
        notasTopo: "Limão, Menta, Eucalipto",
        notasMeio: "Lavanda, Gerânio, Noz-moscada",
        notasFundo: "Sândalo, Cedro, Almíscar",
        avaliacao: 4.4,
        avaliacoes: 112,
        badge: "Energético"
    },
    {
        id: 8,
        nome: "Black Opium",
        marca: "Yves Saint Laurent",
        categoria: "feminino",
        preco: 399.90,
        imagem: "assets/images/perfumes/scandal_gaultier.jpg",
        descricao: "Uma fragrância viciante e misteriosa que desperta os sentidos mais profundos.",
        notasTopo: "Pêra, Groselha Rosa, Laranja",
        notasMeio: "Jasmim, Café, Lírio",
        notasFundo: "Baunilha, Patchouli, Cedro",
        avaliacao: 4.9,
        avaliacoes: 267,
        badge: "Exclusivo"
    }
];

// Estado da aplicação
let produtosFiltrados = [...perfumes];
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let quantidadeModal = 1;

// Elementos DOM
const productsGrid = document.getElementById('productsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const brandFilter = document.getElementById('brandFilter');
const priceFilter = document.getElementById('priceFilter');
const sortFilter = document.getElementById('sortFilter');
const clearFilters = document.getElementById('clearFilters');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const productModal = document.getElementById('productModal');
const cartModal = document.getElementById('cartModal');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderizarProdutos();
    atualizarContadorCarrinho();
    configurarEventListeners();
});

// Configurar event listeners
function configurarEventListeners() {
    // Busca
    searchInput.addEventListener('input', debounce(filtrarProdutos, 300));
    
    // Filtros
    categoryFilter.addEventListener('change', filtrarProdutos);
    brandFilter.addEventListener('change', filtrarProdutos);
    priceFilter.addEventListener('change', filtrarProdutos);
    sortFilter.addEventListener('change', filtrarProdutos);
    clearFilters.addEventListener('click', limparFiltros);
    
    // Carrinho
    cartIcon.addEventListener('click', abrirCarrinho);
    
    // Modais
    document.getElementById('closeModal').addEventListener('click', fecharModal);
    document.getElementById('closeCartModal').addEventListener('click', fecharCarrinhoModal);
    
    // Fechar modal clicando fora
    window.addEventListener('click', function(event) {
        if (event.target === productModal) {
            fecharModal();
        }
        if (event.target === cartModal) {
            fecharCarrinhoModal();
        }
    });
    
    // Menu mobile
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Formulário de contato
    document.getElementById('contactForm').addEventListener('submit', enviarFormulario);
    
    // Scroll suave para seções
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função debounce para otimizar busca
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Renderizar produtos
function renderizarProdutos() {
    mostrarLoading();
    
    setTimeout(() => {
        if (produtosFiltrados.length === 0) {
            mostrarSemResultados();
        } else {
            const html = produtosFiltrados.map(perfume => criarCardProduto(perfume)).join('');
            productsGrid.innerHTML = html;
            esconderLoading();
            esconderSemResultados();
        }
    }, 500);
}

// Criar card do produto
function criarCardProduto(perfume) {
    const estrelas = criarEstrelas(perfume.avaliacao);
    
    return `
        <div class="product-card" onclick="abrirModal(${perfume.id})">
            <div class="product-image">
                <img src="${perfume.imagem}" alt="${perfume.nome}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbTwvdGV4dD48L3N2Zz4='">
                <div class="product-badge">${perfume.badge}</div>
            </div>
            <div class="product-info">
                <div class="product-brand">${perfume.marca}</div>
                <h3 class="product-name">${perfume.nome}</h3>
                <div class="product-rating">
                    <div class="stars">${estrelas}</div>
                    <span class="rating-text">(${perfume.avaliacoes})</span>
                </div>
                <div class="product-price">R$ ${perfume.preco.toFixed(2).replace('.', ',')}</div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="event.stopPropagation(); adicionarAoCarrinho(${perfume.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Comprar
                    </button>
                    <button class="btn-secondary" onclick="event.stopPropagation(); abrirModal(${perfume.id})">
                        Ver Detalhes
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Criar estrelas de avaliação
function criarEstrelas(avaliacao) {
    const estrelasCompletas = Math.floor(avaliacao);
    const temMeiaEstrela = avaliacao % 1 !== 0;
    let html = '';
    
    for (let i = 0; i < estrelasCompletas; i++) {
        html += '<i class="fas fa-star star"></i>';
    }
    
    if (temMeiaEstrela) {
        html += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    const estrelasVazias = 5 - Math.ceil(avaliacao);
    for (let i = 0; i < estrelasVazias; i++) {
        html += '<i class="far fa-star star"></i>';
    }
    
    return html;
}

// Filtrar produtos
function filtrarProdutos() {
    const termoBusca = searchInput.value.toLowerCase();
    const categoria = categoryFilter.value;
    const marca = brandFilter.value;
    const faixaPreco = priceFilter.value;
    const ordenacao = sortFilter.value;
    
    produtosFiltrados = perfumes.filter(perfume => {
        const matchBusca = perfume.nome.toLowerCase().includes(termoBusca) ||
                          perfume.marca.toLowerCase().includes(termoBusca) ||
                          perfume.descricao.toLowerCase().includes(termoBusca);
        
        const matchCategoria = categoria === 'todos' || perfume.categoria === categoria;
        
        const matchMarca = marca === 'todos' || 
                          perfume.marca.toLowerCase().includes(marca.toLowerCase());
        
        let matchPreco = true;
        if (faixaPreco !== 'todos') {
            const [min, max] = faixaPreco.split('-').map(p => parseFloat(p) || Infinity);
            matchPreco = perfume.preco >= min && (max === Infinity || perfume.preco <= max);
        }
        
        return matchBusca && matchCategoria && matchMarca && matchPreco;
    });
    
    // Ordenar produtos
    switch (ordenacao) {
        case 'nome':
            produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
            break;
        case 'preco-asc':
            produtosFiltrados.sort((a, b) => a.preco - b.preco);
            break;
        case 'preco-desc':
            produtosFiltrados.sort((a, b) => b.preco - a.preco);
            break;
        case 'avaliacao':
            produtosFiltrados.sort((a, b) => b.avaliacao - a.avaliacao);
            break;
    }
    
    renderizarProdutos();
}

// Limpar filtros
function limparFiltros() {
    searchInput.value = '';
    categoryFilter.value = 'todos';
    brandFilter.value = 'todos';
    priceFilter.value = 'todos';
    sortFilter.value = 'nome';
    filtrarProdutos();
}

// Função global para limpar filtros (chamada do HTML)
function clearAllFilters() {
    limparFiltros();
}

// Mostrar/esconder loading
function mostrarLoading() {
    loading.style.display = 'block';
    productsGrid.style.display = 'none';
}

function esconderLoading() {
    loading.style.display = 'none';
    productsGrid.style.display = 'grid';
}

// Mostrar/esconder sem resultados
function mostrarSemResultados() {
    noResults.style.display = 'block';
    productsGrid.style.display = 'none';
    esconderLoading();
}

function esconderSemResultados() {
    noResults.style.display = 'none';
}

// Abrir modal do produto
function abrirModal(id) {
    const perfume = perfumes.find(p => p.id === id);
    if (!perfume) return;
    
    document.getElementById('modalImage').src = perfume.imagem;
    document.getElementById('modalTitle').textContent = perfume.nome;
    document.getElementById('modalBrand').textContent = perfume.marca;
    document.getElementById('modalRating').innerHTML = `
        <div class="stars">${criarEstrelas(perfume.avaliacao)}</div>
        <span class="rating-text">(${perfume.avaliacoes} avaliações)</span>
    `;
    document.getElementById('modalPrice').textContent = `R$ ${perfume.preco.toFixed(2).replace('.', ',')}`;
    document.getElementById('modalDescription').textContent = perfume.descricao;
    document.getElementById('modalNotesTop').textContent = perfume.notasTopo;
    document.getElementById('modalNotesMid').textContent = perfume.notasMeio;
    document.getElementById('modalNotesBase').textContent = perfume.notasFundo;
    
    quantidadeModal = 1;
    document.getElementById('quantity').textContent = quantidadeModal;
    
    document.getElementById('addToCartBtn').onclick = () => {
        adicionarAoCarrinho(id, quantidadeModal);
        fecharModal();
    };
    
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function fecharModal() {
    productModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Alterar quantidade no modal
function changeQuantity(delta) {
    quantidadeModal = Math.max(1, quantidadeModal + delta);
    document.getElementById('quantity').textContent = quantidadeModal;
}

// Adicionar ao carrinho
function adicionarAoCarrinho(id, quantidade = 1) {
    const perfume = perfumes.find(p => p.id === id);
    if (!perfume) return;
    
    const itemExistente = carrinho.find(item => item.id === id);
    
    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            ...perfume,
            quantidade: quantidade
        });
    }
    
    salvarCarrinho();
    atualizarContadorCarrinho();
    mostrarNotificacao(`${perfume.nome} adicionado ao carrinho!`);
}

// Remover do carrinho
function removerDoCarrinho(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    salvarCarrinho();
    atualizarContadorCarrinho();
    renderizarCarrinho();
}

// Alterar quantidade no carrinho
function alterarQuantidadeCarrinho(id, novaQuantidade) {
    const item = carrinho.find(item => item.id === id);
    if (item) {
        if (novaQuantidade <= 0) {
            removerDoCarrinho(id);
        } else {
            item.quantidade = novaQuantidade;
            salvarCarrinho();
            atualizarContadorCarrinho();
            renderizarCarrinho();
        }
    }
}

// Salvar carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Atualizar contador do carrinho
function atualizarContadorCarrinho() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    cartCount.textContent = totalItens;
    cartCount.style.display = totalItens > 0 ? 'flex' : 'none';
}

// Abrir carrinho
function abrirCarrinho() {
    renderizarCarrinho();
    cartModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fechar carrinho
function fecharCarrinhoModal() {
    cartModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Função global para fechar carrinho (chamada do HTML)
function closeCartModal() {
    fecharCarrinhoModal();
}

// Renderizar carrinho
function renderizarCarrinho() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartTotal = document.getElementById('cartTotal');
    
    if (carrinho.length === 0) {
        cartItems.style.display = 'none';
        cartTotal.style.display = 'none';
        cartEmpty.style.display = 'block';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartItems.style.display = 'block';
    cartTotal.style.display = 'block';
    
    const html = carrinho.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.imagem}" alt="${item.nome}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZW08L3RleHQ+PC9zdmc+'">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.nome}</div>
                <div class="cart-item-brand">${item.marca}</div>
                <div class="cart-item-price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="qty-btn" onclick="alterarQuantidadeCarrinho(${item.id}, ${item.quantidade - 1})">-</button>
                <span>${item.quantidade}</span>
                <button class="qty-btn" onclick="alterarQuantidadeCarrinho(${item.id}, ${item.quantidade + 1})">+</button>
            </div>
            <button class="cart-item-remove" onclick="removerDoCarrinho(${item.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `).join('');
    
    cartItems.innerHTML = html;
    
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    document.getElementById('totalAmount').textContent = total.toFixed(2).replace('.', ',');
}

// Toggle menu mobile
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Scroll para seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enviar formulário de contato
function enviarFormulario(event) {
    event.preventDefault();
    
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('message').value;
    
    // Simular envio
    mostrarNotificacao('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Limpar formulário
    document.getElementById('contactForm').reset();
}

// Mostrar notificação
function mostrarNotificacao(mensagem) {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = 'notification';
    notificacao.textContent = mensagem;
    notificacao.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Adicionar CSS da animação se não existir
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notificacao);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notificacao.parentNode) {
                notificacao.parentNode.removeChild(notificacao);
            }
        }, 300);
    }, 3000);
}

// Efeitos de scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.section-title, .about-text, .contact-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Prevenção de erro de imagem
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlbTwvdGV4dD48L3N2Zz4=';
        });
    });
});



// Funcionalidade do WhatsApp
function finalizarCompraWhatsApp() {
    if (carrinho.length === 0) {
        mostrarNotificacao('Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.');
        return;
    }
    
    // Número do WhatsApp da loja (substitua pelo número real)
    const numeroWhatsApp = '5517988372407'; // Formato: código do país + DDD + número
    
    // Gerar mensagem com os itens do carrinho
    let mensagem = '🛍️ *Olá! Gostaria de finalizar minha compra:*\n\n';
    
    carrinho.forEach((item, index) => {
        mensagem += `${index + 1}. *${item.nome}*\n`;
        mensagem += `   Marca: ${item.marca}\n`;
        mensagem += `   Quantidade: ${item.quantidade}\n`;
        mensagem += `   Preço unitário: R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
        mensagem += `   Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n\n`;
    });
    
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    mensagem += `💰 *Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    mensagem += '📞 Aguardo contato para finalizar o pedido!\n';
    mensagem += '🚚 Gostaria de saber sobre formas de pagamento e entrega.';
    
    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Gerar URL do WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Abrir WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');
    
    // Mostrar notificação de sucesso
    mostrarNotificacao('Redirecionando para o WhatsApp...');
    
    // Opcional: Limpar carrinho após envio (descomente se desejar)
    // setTimeout(() => {
    //     carrinho = [];
    //     salvarCarrinho();
    //     atualizarContadorCarrinho();
    //     fecharCarrinhoModal();
    // }, 2000);
}

// Configurar número do WhatsApp da loja
function configurarWhatsApp(numero) {
    // Esta função permite alterar o número do WhatsApp facilmente
    // Formato esperado: código do país + DDD + número (apenas números)
    // Exemplo: '5511999999999' para +55 (11) 99999-9999
    localStorage.setItem('5517988372407', numero);
}

// Obter número do WhatsApp configurado
function obterNumeroWhatsApp() {
    return localStorage.getItem('5517988372407') || '5517988372407';
}

// Atualizar a função finalizarCompraWhatsApp para usar o número configurado
function finalizarCompraWhatsAppAtualizada() {
    if (carrinho.length === 0) {
        mostrarNotificacao('Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.');
        return;
    }
    
    const numeroWhatsApp = obterNumeroWhatsApp();
    
    // Gerar mensagem com os itens do carrinho
    let mensagem = '🛍️ *Olá! Gostaria de finalizar minha compra na Perfumaria Elegance:*\n\n';
    
    carrinho.forEach((item, index) => {
        mensagem += `${index + 1}. *${item.nome}*\n`;
        mensagem += `   📱 Marca: ${item.marca}\n`;
        mensagem += `   📦 Quantidade: ${item.quantidade}x\n`;
        mensagem += `   💵 Preço unitário: R$ ${item.preco.toFixed(2).replace('.', ',')}\n`;
        mensagem += `   💰 Subtotal: R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n\n`;
    });
    
    const total = carrinho.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
    mensagem += `🏷️ *TOTAL DO PEDIDO: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
    mensagem += '📞 Aguardo contato para finalizar o pedido!\n';
    mensagem += '💳 Gostaria de saber sobre formas de pagamento e entrega.\n';
    mensagem += '🚚 Qual o prazo de entrega para minha região?\n\n';
    mensagem += '✨ Obrigado(a) por escolher a Perfumaria Elegance!';
    
    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Gerar URL do WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Abrir WhatsApp em nova aba
    window.open(urlWhatsApp, '_blank');
    
    // Mostrar notificação de sucesso
    mostrarNotificacao('🚀 Redirecionando para o WhatsApp...');
}

// Adicionar event listener ao botão de finalizar compra quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um pouco para garantir que todos os elementos foram criados
    setTimeout(() => {
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', finalizarCompraWhatsAppAtualizada);
        }
    }, 1000);
});

// Função para demonstração - configurar número do WhatsApp
// Para usar, chame: configurarWhatsApp('5511999999999') no console do navegador
// Substitua pelo número real da sua loja

