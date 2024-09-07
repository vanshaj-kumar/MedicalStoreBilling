let totalAmount = 0;
let billItems = [];

// Event listener for adding items to the bill
document.getElementById('addItemButton').addEventListener('click', function () {
    const medicineSelect = document.getElementById('medicine');
    const quantityInput = document.getElementById('quantity');
    const rateInput = document.getElementById('rate');

    const selectedMedicine = medicineSelect.value;
    const quantity = parseInt(quantityInput.value, 10);
    const rate = rateInput.value ? parseFloat(rateInput.value) : null;  // Optional rate

    if (selectedMedicine && quantity > 0) {
        const total = rate ? rate * quantity : 'Pending Rate';

        // Add to the billItems array
        billItems.push({
            medicine: selectedMedicine,
            quantity: quantity,
            rate: rate || "N/A",
            total: rate ? total : "Pending"
        });

        // Add row to the bill table
        const row = document.createElement('tr');
        row.innerHTML = `<td>${selectedMedicine}</td><td>${quantity}</td><td>${rate || "N/A"}</td><td>${rate ? total.toFixed(2) : "Pending"}</td>`;
        document.getElementById('billItems').appendChild(row);

        // Update total amount if rate is provided
        if (rate) {
            totalAmount += total;
            document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
        }

        // Reset form fields
        medicineSelect.value = '';
        quantityInput.value = '';
        rateInput.value = '';
    } else {
        alert('Please select a medicine, enter a valid quantity, and optionally enter the rate.');
    }
});

// Event listener for generating the bill
document.getElementById('generateBillButton').addEventListener('click', function () {
    if (billItems.length > 0) {
        let finalBillHTML = '<h3>Welcome Vet Medical Agency-Final Bill </h3>';
        finalBillHTML += '<table><thead><tr><th>Medicine</th><th>Quantity</th><th>Rate</th><th>Total</th></tr></thead><tbody>';

        billItems.forEach(item => {
            finalBillHTML += `<tr><td>${item.medicine}</td><td>${item.quantity}</td><td>₹${item.rate}</td><td>₹${item.total}</td></tr>`;
        });

        finalBillHTML += `</tbody></table><p><strong>Total Payable Amount: ₹${totalAmount.toFixed(2)}</strong></p>`;

        // Display the final bill
        document.getElementById('finalBill').innerHTML = finalBillHTML;
    } else {
        alert('No items added to the bill.');
    }
});
