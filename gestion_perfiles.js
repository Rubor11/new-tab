const perfiles = {
    "Perfil 1": `
        <h3>Entretenimiento</h3>
            <br>
            <div class="link-grid">
                <a href="https://gmail.com" target="_blank" class="link-button"><img src="img/gmail.svg" alt="Gmail"
                        class="link-icon" /></a>
                <a href="https://chatgpt.com" target="_blank" class="link-button"><img src="img/openai.svg"
                        alt="ChatGPT" class="link-icon" /></a>
                <a href="https://youtube.com" target="_blank" class="link-button"><img src="img/youtube.svg"
                        alt="Youtube" class="link-icon" /></a>
                <a href="https://x.com/home" target="_blank" class="link-button"><img src="img/twitter.svg"
                        alt="Twitter" class="link-icon" /></a>
                <a href="https://www.reddit.com/" target="_blank" class="link-button"><img src="img/reddit.svg"
                        alt="Reddit" class="link-icon" /></a>
                <a href="https://web.whatsapp.com/" target="_blank" class="link-button"><img src="img/whatsapp.svg"
                        alt="WhatsApp" class="link-icon" /></a>
                <a href="https://www10.playdede.link/" target="_blank" class="link-button"><img src="img/playdede.png"
                        alt="Playdede" class="link-icon" /></a>
                <a href="https://www3.animeflv.net/" target="_blank" class="link-button"><img src="img/pokeball.png"
                        alt="Animeflv" class="link-icon"></a>
            </div>
            <h3>Dineros</h3>
            <div class="link-grid">
                <a href="https://www.bet365.es/#/HO/" target="_blank" class="link-button"><img src="img/bet365.png"
                        alt="Bet365" class="link-icon"></a>
                <a href="https://www.coinbase.com/assets" target="_blank" class="link-button"><img
                        src="img/coinbase-v2-svgrepo-com.svg" alt="Coinbase" class="link-icon"></a>
            </div>
    `,
    "Perfil 2": `
        <h3>Trabajo</h3>
        <div class="link-grid">
            <a href="https://chatgpt.com" target="_blank" class="link-button"><img src="img/openai.svg"
                        alt="ChatGPT" class="link-icon" /></a>
            <a href="https://sohohoteles.sharepoint.com/SitePages/Home.aspx" target="_blank" class="link-button"><img src="img/sharepoint.png" alt="SharePoint" class="link-icon" /></a>
            <a href="https://pms2.sihot.com/0447/SIHOTHTML/?config=SB_1105_1" target="_blank" class="link-button"><img src="img/sihot.jpg" alt="Sihot" class="link-icon" /></a>
            <a href="https://gateway.publiccloud.sihot.com:8443/RDWeb/Pages/es-ES/login.aspx?ReturnUrl=/RDWeb/Pages/es-ES/Default.aspx" target="_blank" class="link-button"><img src="img/world.svg" alt="SaaS.sihot.com" class="link-icon" /></a>
            <a href="https://sohohoteles.sharepoint.com/:x:/r/sites/administracion/_layouts/15/Doc.aspx?sourcedoc=%7B4B990DDF-C2E7-4B65-974C-49C859077AEF%7D&file=SOHO%20SaaS%20POS%20Users.xlsx&action=default&mobileredirect=true&DefaultItemOpen=1%3Fweb%3D1" target="_blank" class="link-button"><img src="img/excel.svg" alt="POS User Sihot TPV" class="link-icon" /></a>
            <a href="https://sohohoteles-my.sharepoint.com/:o:/r/personal/sistemas4_sohohoteles_com/_layouts/15/doc2.aspx?sourcedoc=%7BD0B7A517-730B-4B68-9DF5-FDEC775AC65B%7D&file=Manual%20SIHOT&action=edit&mobileredirect=true&wdorigin=Sharepoint&RootFolder=%2Fpersonal%2Fsistemas4_sohohoteles_com%2FDocuments%2FBlocs%20de%20notas%2FManual%20SIHOT&CID=e6db881d-ba11-405c-93de-3556b017604c" target="_blank" class="link-button"><img src="img/one_note.png" alt="Manual Sihot" class="link-icon" /></a>
            <a href="https://secure.roomcloud.net/be/owners_area/index.jsp" target="_blank" class="link-button"><img src="img/cloudRoom.png" alt="RoomCloud" class="link-icon" /></a>
        </div>
        <h3>Power Platform</h3>
        <div class="link-grid">
            <a href="https://make.powerautomate.com/environments/Default-a5839d11-3ae4-4e46-a6cb-db2abb961dfc/flows" target="_blank" class="link-button"><img src="img/pw_automate.png" alt="Power Automate" class="link-icon" /></a>
            <a href="https://make.powerapps.com/environments/Default-a5839d11-3ae4-4e46-a6cb-db2abb961dfc/apps" target="_blank" class="link-button"><img src="img/pw_apps.png" alt="Power Apps" class="link-icon" /></a>
            <a href="https://m365.cloud.microsoft/apps/?auth=2" target="_blank" class="link-button"><img src="img/microsoft.png" alt="Aplicaciones Microsoft" class="link-icon" /></a>
        </div>
        <h3>Estadísticas</h3>
        <div class="link-grid">

        </div>

    `,
    "Perfil 3": `
        <h3>Estudio</h3>
        <div class="link-grid">
            <a href="https://moodle.org" target="_blank" class="link-button"><img src="img/moodle.svg" alt="Moodle" class="link-icon" /></a>
            <a href="https://github.com" target="_blank" class="link-button"><img src="img/github.svg" alt="GitHub" class="link-icon" /></a>
        </div>
    `
};

function actualizarCeldaA(perfil) {
    const celdaA = document.getElementById('celda-a');
    celdaA.innerHTML = perfiles[perfil] || "<p>Perfil no encontrado</p>";
}

document.querySelectorAll('.icono-perfil').forEach(icono => {
    icono.addEventListener('click', () => {
        const perfilSeleccionado = icono.dataset.perfil;
        actualizarCeldaA(perfilSeleccionado);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    actualizarCeldaA("Perfil 1");
});
