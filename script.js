// Senhas fixas
const ADMIN_PASSWORD = 'Morros123';
const VIP_PASSWORD = 'Morros321';

// Página index.html — login VIP
if (document.getElementById('vip-login-form')) {
  const vipForm = document.getElementById('vip-login-form');
  const vipPasswordInput = document.getElementById('vip-password');
  const vipError = document.getElementById('vip-error');

  vipForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (vipPasswordInput.value === VIP_PASSWORD) {
      // Redireciona para a área VIP
      window.location.href = 'vip.html';
    } else {
      vipError.textContent = 'Senha incorreta. Tente novamente.';
      vipPasswordInput.value = '';
      vipPasswordInput.focus();
    }
  });
}

// Página admin.html — login administrador e painel
if (document.getElementById('admin-login-form')) {
  const adminForm = document.getElementById('admin-login-form');
  const adminPasswordInput = document.getElementById('admin-password');
  const adminError = document.getElementById('admin-error');
  const loginSection = document.getElementById('login-section');
  const panelSection = document.getElementById('panel-section');

  const palpiteForm = document.getElementById('palpite-form');
  const palpitesList = document.getElementById('palpites-list');
  const generatedCode = document.getElementById('generated-code');

  let palpites = [];

  // Função para atualizar a lista visível no admin
  function atualizarLista() {
    palpitesList.innerHTML = '';
    palpites.forEach((palpite, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div>
          <strong>${palpite.jogo}</strong> | Gols: ${palpite.gols} | Escanteios: ${palpite.escanteios} | Vitória: ${palpite.vitoria} | Resultado: ${palpite.resultado}
        </div>
        <button data-index="${index}">Excluir</button>
      `;
      palpitesList.appendChild(li);
    });

    // Botão excluir
    palpitesList.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.target.getAttribute('data-index');
        palpites.splice(idx, 1);
        atualizarLista();
        gerarCodigo();
      });
    });
  }

  // Função para gerar o código HTML dos palpites para área VIP
  function gerarCodigo() {
    if (palpites.length === 0) {
      generatedCode.value = '<p>Nenhum palpite cadastrado.</p>';
      return;
    }
    let html = '';
    palpites.forEach(p => {
      html += `<div class="palpite-card">
  <h3>${p.jogo}</h3>
  <ul>
    <li><strong>Gols:</strong> ${p.gols}</li>
    <li><strong>Escanteios:</strong> ${p.escanteios}</li>
    <li><strong>Vitória:</strong> ${p.vitoria}</li>
    <li><strong>Resultado exato:</strong> ${p.resultado}</li>
  </ul>
</div>\n`;
    });
    generatedCode.value = html;
  }

  adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (adminPasswordInput.value === ADMIN_PASSWORD) {
      loginSection.style.display = 'none';
      panelSection.style.display = 'block';
    } else {
      adminError.textContent = 'Senha incorreta.';
      adminPasswordInput.value = '';
      adminPasswordInput.focus();
    }
  });

  palpiteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const novoPalpite = {
      jogo: document.getElementById('jogo').value.trim(),
      gols: document.getElementById('gols').value.trim(),
      escanteios: document.getElementById('escanteios').value.trim(),
      vitoria: document.getElementById('vitoria').value.trim(),
      resultado: document.getElementById('resultado').value.trim(),
    };

    palpites.push(novoPalpite);
    atualizarLista();
    gerarCodigo();

    palpiteForm.reset();
  });
}

// Página vip.html — carregar os palpites gerados pelo admin
if (document.getElementById('palpites-container')) {
  const container = document.getElementById('palpites-container');

  // Para facilitar, você deve copiar o HTML gerado no admin e colar aqui dentro manualmente.
  // Exemplo:
  // container.innerHTML = `<div class="palpite-card">...</div>`

  container.innerHTML = '<p>Aguardando palpites do administrador...</p>';
}
