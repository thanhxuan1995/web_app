function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const expandBtn = document.getElementById('expandSidebarBtn');

    // Toggle collapsed state
    sidebar.classList.toggle('collapsed');

    // Show/hide expand button based on sidebar state
    if (sidebar.classList.contains('collapsed')) {
        expandBtn.style.display = 'block';  // show expand button
    } else {
        expandBtn.style.display = 'none';   // hide when sidebar expanded
    }
}
function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    submenu.style.display = (submenu.style.display === 'block') ? 'none' : 'block';
}

function loadPage(page) {
    const main = document.getElementById('main-content');

    if (page === 'dashboard') {
        main.innerHTML = `
            <h2 class="dynamic-header">DRM Key Dashboard</h2>
            <p>If the dashboard does not load, you can <a href="https://skynet.db.amazon.com/views/AMDI_16639568650370/DRMQuantityTracking" target="_blank">open it in a new tab</a>.</p>
            <tableau-viz
                id="tableau-viz"
                src="https://skynet.db.amazon.com/views/AMDI_16639568650370/DRMQuantityTracking"
                width="100%"
                height="800px"
                toolbar="bottom">
            </tableau-viz>
        `;
    } 
    else if (page === 'reports') {
        main.innerHTML = `
            <h2 class="dynamic-header">Reports</h2>
            <p>Reports content coming soon...</p>
        `;
    } 
    else if (page === 'project1') {
        main.innerHTML = `
            <h2 class="dynamic-header">Yield Quality Intelligence Suite (YQIS)</h2>
            <p>The YQIS tool cannot be embedded due to security restrictions.</p>
            <a href="https://partyrock.aws/u/ntxuan/n418oJQom/Yield-Quality-Intelligence-Suite-(YQIS)" target="_blank" class="external-link-btn">Open YQIS Tool →</a>
        `;
    }
    else if (page === 'project2') {
        main.innerHTML = `
            <h2 class="dynamic-header">Test Log File Partition</h2>
            <div class="card">
                <p>Upload a log file to partition and get a structured CSV.</p>
                <form id="uploadForm">
                    <input type="file" id="fileInput" name="file" required />
                    <button type="submit">Upload & Process</button>
                </form>
                <div class="progress-section" id="progressSection" style="display:none;">
                    <div class="progress-bar">
                        <div class="progress" id="progress"></div>
                    </div>
                    <p id="progressText">Processing...</p>
                </div>
                <div id="resultSection" style="display:none;">
                    <h3>✅ Completed!</h3>
                    <a id="downloadLink" class="download-btn" href="#" download>Download CSV</a>
                </div>
            </div>
        `;

        // Bind upload form
        const form = document.getElementById('uploadForm');
        const fileInput = document.getElementById('fileInput');
        const progressSection = document.getElementById('progressSection');
        const progressBar = document.getElementById('progress');
        const progressText = document.getElementById('progressText');
        const resultSection = document.getElementById('resultSection');
        const downloadLink = document.getElementById('downloadLink');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const file = fileInput.files[0];
            if (!file) {
                alert("Please select a file first.");
                return;
            }

            progressSection.style.display = 'block';
            resultSection.style.display = 'none';
            progressBar.style.width = '0%';
            progressText.textContent = 'Uploading...';

            const formData = new FormData();
            formData.append('file', file);

            try {
                // Simulate progress
                let progress = 0;
                const interval = setInterval(() => {
                    if (progress < 80) {
                        progress += 10;
                        progressBar.style.width = progress + '%';
                    }
                }, 300);

                const response = await fetch('/api/partition', {
                    method: 'POST',
                    body: formData
                });

                clearInterval(interval);
                progressBar.style.width = '100%';
                progressText.textContent = 'Processing Complete!';

                if (!response.ok) throw new Error('Server error while processing file.');

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                downloadLink.href = url;

                // Dynamically generate the download file name based on uploaded file
                const baseName = file.name.split('.').slice(0, -1).join('.');
                downloadLink.download = `${baseName}_partition.csv`;
                
                resultSection.style.display = 'block';

            } catch (error) {
                alert('Error: ' + error.message);
                progressText.textContent = '❌ Failed. Please try again.';
            }
        });
    }
    else if (page === 'project3') {
        main.innerHTML = `
            <h2 class="dynamic-header">Project 3</h2>
            <p>Coming soon...Project for AI Chineese speaking practice</p>
        `;
    }
    else if (page === 'settings') {
        main.innerHTML = `
            <h2 class="dynamic-header">Settings</h2>
            <p>System configuration options here.</p>
        `;
    }
    else if (page === 'aboutus') {
        main.innerHTML = `
        <h2 class="dynamic-header">Welcome to Sally's Organization</h2>
        <p>The Phone Tool page cannot be embedded due to login restrictions.</p>
        <a href="https://phonetool.amazon.com/users/gjianyin" target="_blank" class="external-link-btn">Open Phone Tool →</a>
        <div class="about-image-container">
            <img src="../image_folder/Sally_org.png" alt="Sally's Organization" class="about-image">
        </div>
    `;
    }
    // New block for Amazon AI Tool Kits
    else if (page === 'amazon-ai-tools') {
        main.innerHTML = `
            <h2 class="dynamic-header">Amazon AI Tool Kits</h2>
            <div class="ai-tools-table-container">
                <table class="ai-tools-table">
                    <thead>
                        <tr>
                            <th>Tool Name</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>PartyRock for Image Creation</td>
                            <td><a href="https://partyrock.aws/image" target="_blank">Open</a></td>
                        </tr>
                        <tr>
                            <td>PartyRock for Data Analytics</td>
                            <td><a href="https://partyrock.aws/data" target="_blank">Open</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    }
}

