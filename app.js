// Fetch the data from your server (ensure you're using the correct ngrok URL or localhost during testing)
axios.get('https://5992-14-139-240-50.ngrok-free.app') // Replace with your ngrok URL or local endpoint
    .then(response => {
        // Check the data structure from the response
        console.log('Data received:', response.data);

        // Ensure response contains the data you expect (e.g., 'attacks' or 'data')
        const attackLogs = response.data || [];  // Default to empty array if data is not found

        const tableBody = document.getElementById('attackTableBody');
        tableBody.innerHTML = '';  // Clear the table before updating

        // Loop through the attack logs and create table rows
        attackLogs.forEach(attack => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-4 py-2 border-b">${attack.src_ip}</td>
                <td class="px-4 py-2 border-b">${attack.dst_ip}</td>
                <td class="px-4 py-2 border-b">${attack.proto}</td>
                <td class="px-4 py-2 border-b">${attack.state}</td>
                <td class="px-4 py-2 border-b">${attack.service}</td>
                <td class="px-4 py-2 border-b">${attack.attack_type}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching attack data:', error);
    });
