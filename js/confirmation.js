/* ============================================
   VelaroCar - Confirmation Page Logic
   QR Code, PDF Receipt
   ============================================ */

(function() {
    'use strict';

    var params = new URLSearchParams(window.location.search);
    var reservationId = params.get('id');
    var reservations = getReservationData();
    var reservation = reservations.find(function(r) { return r.id === reservationId; });

    if (!reservation) {
        document.getElementById('confirmation-content').innerHTML =
            '<div style="text-align:center;padding:4rem 1rem;">' +
                '<i class="fas fa-exclamation-triangle" style="font-size:64px;color:var(--warning);margin-bottom:1.5rem;display:block;"></i>' +
                '<h2>Réservation introuvable</h2>' +
                '<p style="color:var(--gray-500);margin:1rem 0 2rem;">La réservation que vous recherchez n\'existe pas ou a été supprimée.</p>' +
                '<a href="index.html" class="btn btn-primary"><i class="fas fa-home"></i> Retour à l\'accueil</a>' +
            '</div>';
        return;
    }

    /* --- Calculate total --- */
 
    var days = calculateDays(reservation.startDate, reservation.endDate);
    var grandTotal = reservation.pricePerDay * days;
    /* --- Type labels --- */
    var typeLabels = {
        voiture: 'Location de Voiture',
        moto: 'Location de Moto',
        maison: 'Location d\'Hébergement',
        excursion: 'Excursion Touristique'
    };

    /* --- Status --- */
    var statusClass = reservation.status === 'confirmed' ? 'success' : (reservation.status === 'cancelled' ? 'danger' : 'warning');
    var statusLabels = { pending: 'En attente', confirmed: 'Confirmée', cancelled: 'Annulée' };

    /* --- Render confirmation --- */
    var el = document.getElementById('confirmation-content');
    if (el) {
        el.innerHTML =
            '<div style="text-align:center;margin-bottom:2rem;">' +
                '<div style="width:80px;height:80px;border-radius:50%;background:rgba(16,185,129,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">' +
                    '<i class="fas fa-check-circle" style="font-size:40px;color:var(--success);"></i>' +
                '</div>' +
                '<h1 style="font-size:1.75rem;margin-bottom:0.5rem;">Réservation Enregistrée !</h1>' +
                '<p style="color:var(--gray-500);">Votre réservation a bien été enregistrée. Vous recevrez une confirmation par email.</p>' +
            '</div>' +

            '<div style="background:var(--white);border:1px solid var(--gray-200);border-radius:16px;overflow:hidden;">' +
                '<div style="background:var(--primary);color:white;padding:1.5rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;">' +
                    '<div>' +
                        '<div style="font-size:0.85rem;color:var(--gray-400);">Numéro de réservation</div>' +
                        '<div style="font-size:1.25rem;font-weight:700;">#' + reservation.id + '</div>' +
                    '</div>' +
                    '<div style="text-align:right;">' +
                        '<div style="font-size:0.85rem;color:var(--gray-400);">Statut</div>' +
                        '<div style="background:var(--' + statusClass + ');color:white;padding:4px 16px;border-radius:20px;font-size:0.85rem;font-weight:600;">' + (statusLabels[reservation.status] || 'En attente') + '</div>' +
                    '</div>' +
                '</div>' +

                '<div style="padding:1.5rem;">' +
                    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">' +
                        '<div>' +
                            '<h4 style="font-size:0.8rem;color:var(--gray-500);text-transform:uppercase;margin-bottom:0.5rem;">Client</h4>' +
                            '<p style="font-weight:600;">' + reservation.firstName + ' ' + reservation.lastName + '</p>' +
                            '<p style="font-size:0.9rem;color:var(--gray-600);">' + reservation.email + '</p>' +
                            '<p style="font-size:0.9rem;color:var(--gray-600);">' + reservation.phone + '</p>' +
                        '</div>' +
                        '<div>' +
                            '<h4 style="font-size:0.8rem;color:var(--gray-500);text-transform:uppercase;margin-bottom:0.5rem;">Produit</h4>' +
                            '<p style="font-weight:600;">' + (typeLabels[reservation.type] || reservation.type) + '</p>' +
                            '<p style="font-size:0.9rem;color:var(--gray-600);">' + reservation.productName + '</p>' +
                        '</div>' +
                    '</div>' +

                    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">' +
                        '<div>' +
                            '<h4 style="font-size:0.8rem;color:var(--gray-500);text-transform:uppercase;margin-bottom:0.5rem;">Dates</h4>' +
                            '<p style="font-size:0.9rem;"><strong>Début :</strong> ' + new Date(reservation.startDate).toLocaleDateString('fr-FR') + '</p>' +
                            '<p style="font-size:0.9rem;"><strong>Fin :</strong> ' + new Date(reservation.endDate).toLocaleDateString('fr-FR') + '</p>' +
                            '<p style="font-size:0.9rem;"><strong>Durée :</strong> ' + days + ' jour(s)</p>' +
                        '</div>' +
                        '<div>' +
                            '<h4 style="font-size:0.8rem;color:var(--gray-500);text-transform:uppercase;margin-bottom:0.5rem;">Tarification</h4>' +
                            '<p style="font-size:0.9rem;"><strong>Prix unitaire :</strong> ' + formatPrice(reservation.pricePerDay) + '</p>' +
                            '<p style="font-size:1.1rem;font-weight:800;color:var(--accent);margin-top:0.25rem;"><strong>Prix total :</strong> ' + formatPrice(grandTotal) + '</p>' +
                        '</div>' +
                    '</div>' +

                    '<div id="qrcode-container" style="text-align:center;padding:1.5rem;background:var(--gray-50);border-radius:12px;margin-bottom:1.5rem;">' +
                        '<p style="font-size:0.85rem;color:var(--gray-500);margin-bottom:0.5rem;">QR Code de réservation</p>' +
                        '<div id="qrcode"></div>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div style="display:flex;gap:1rem;margin-top:1.5rem;flex-wrap:wrap;justify-content:center;">' +
                '<button class="btn btn-primary btn-lg" onclick="window.print()"><i class="fas fa-print"></i> Imprimer le reçu</button>' +
                '<button class="btn btn-gold btn-lg" id="download-pdf-btn"><i class="fas fa-file-pdf"></i> Télécharger le reçu PDF</button>' +
                '<a href="index.html" class="btn btn-outline-dark btn-lg"><i class="fas fa-home"></i> Retour à l\'accueil</a>' +
            '</div>' +
        '<!-- CONTACT SECTION -->' +
        '<div style="margin-top:3rem;padding:1.5rem;background:var(--gray-50);border-radius:16px;text-align:center;">' +
            '<h3 style="margin-bottom:0.5rem;">Des questions ?</h3>' +
            '<p style="color:var(--gray-500);margin-bottom:1rem;">Contactez-nous pour toute modification ou demande.</p>' +
            '<div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">' +
                '<a href="https://wa.me/' + SITE_CONFIG.whatsapp + '" target="_blank" class="btn" style="background:#25D366;color:white;"><i class="fab fa-whatsapp"></i> WhatsApp</a>' +
                '<a href="tel:' + SITE_CONFIG.phone + '" class="btn btn-primary"><i class="fas fa-phone-alt"></i> Appeler</a>' +
                '<a href="mailto:' + SITE_CONFIG.email + '" class="btn btn-outline-dark"><i class="fas fa-envelope"></i> Email</a>' +
            '</div>' +
        '</div>';
    }

    /* --- Generate QR Code --- */
    function generateQR() {
        var qrEl = document.getElementById('qrcode');
        if (!qrEl) return;

        var qrData = JSON.stringify({
            reservation: reservation.id,
            client: reservation.firstName + ' ' + reservation.lastName,
            product: reservation.productName,
            dates: reservation.startDate + ' - ' + reservation.endDate,
            total: grandTotal + ' MAD'
        });

        if (typeof QRCode !== 'undefined') {
            new QRCode(qrEl, {
                text: qrData,
                width: 150,
                height: 150,
                colorDark: '#0f172a',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        } else {
            qrEl.innerHTML = '<div style="width:150px;height:150px;margin:0 auto;border:2px solid var(--gray-200);border-radius:8px;display:flex;align-items:center;justify-content:center;color:var(--gray-400);font-size:0.8rem;">QR Code<br>Chargez la lib</div>';
        }
    }
    generateQR();

    /* --- PDF Download --- */
    var pdfBtn = document.getElementById('download-pdf-btn');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', function() {
            generatePDF();
        });
    }

    function generatePDF() {
        var printWindow = window.open('', '_blank');
        printWindow.document.write(
            '<!DOCTYPE html><html><head><title>Reçu VelaroCar - ' + reservation.id + '</title>' +
            '<style>' +
            '* { margin:0; padding:0; box-sizing:border-box; }' +
            'body { font-family: Arial, sans-serif; color: #333; padding: 40px; }' +
            '.header { display:flex; justify-content:space-between; align-items:center; border-bottom: 3px solid #d4af37; padding-bottom: 20px; margin-bottom: 30px; }' +
            '.logo { font-size: 28px; font-weight: 800; color: #0f172a; }' +
            '.logo span { color: #d4af37; }' +
            '.info { text-align: right; font-size: 13px; color: #666; }' +
            '.info strong { color: #0f172a; }' +
            '.section { margin-bottom: 20px; }' +
            '.section h3 { font-size: 12px; text-transform: uppercase; color: #666; letter-spacing: 1px; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 4px; }' +
            '.row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }' +
            '.row strong { min-width: 150px; }' +
            '.total { background: #0f172a; color: white; padding: 15px 20px; border-radius: 8px; margin-top: 20px; }' +
            '.total .row { color: white; }' +
            '.total .row.final { font-size: 18px; font-weight: 800; }' +
            '.footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 11px; color: #999; }' +
            '.badge { display: inline-block; background: #f59e0b; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }' +
            '.signature { margin-top: 40px; text-align: right; font-size: 13px; color: #666; }' +
            '.signature-line { border-top: 1px solid #333; width: 200px; margin-left: auto; margin-top: 50px; padding-top: 5px; }' +
            '@media print { body { padding: 20px; } }' +
            '</style></head><body>' +
            '<div class="header">' +
                '<div><div class="logo">Velaro<span>Car</span></div><div style="font-size:12px;color:#666;margin-top:4px;">Location Premium à Marrakech</div></div>' +
                '<div class="info"><div><strong>Récépissé de réservation</strong></div><div>N° ' + reservation.id + '</div><div>Date : ' + new Date().toLocaleDateString('fr-FR') + ' à ' + new Date().toLocaleTimeString('fr-FR') + '</div></div>' +
            '</div>' +
            '<div class="section"><h3>Informations Client</h3>' +
                '<div class="row"><strong>Nom complet :</strong> ' + reservation.firstName + ' ' + reservation.lastName + '</div>' +
                '<div class="row"><strong>Email :</strong> ' + reservation.email + '</div>' +
                '<div class="row"><strong>Téléphone :</strong> ' + reservation.phone + '</div>' +
            '</div>' +
            '<div class="section"><h3>Détails de la Réservation</h3>' +
                '<div class="row"><strong>Type :</strong> ' + (typeLabels[reservation.type] || reservation.type) + '</div>' +
                '<div class="row"><strong>Produit :</strong> ' + reservation.productName + '</div>' +
                '<div class="row"><strong>Date de début :</strong> ' + new Date(reservation.startDate).toLocaleDateString('fr-FR') + '</div>' +
                '<div class="row"><strong>Date de fin :</strong> ' + new Date(reservation.endDate).toLocaleDateString('fr-FR') + '</div>' +
                '<div class="row"><strong>Durée :</strong> ' + days + ' jour(s)</div>' +
                '<div class="row"><strong>Statut :</strong> <span class="badge">' + (statusLabels[reservation.status] || 'En attente') + '</span></div>' +
            '</div>' +
            '<div class="section"><h3>Facturation</h3>' +
                '<div class="row"><strong>Prix unitaire :</strong> ' + formatPrice(reservation.pricePerDay) + ' / jour</div>' +
            '</div>' +
            '<div class="total">' +
                '<div class="row final"><strong>Prix total :</strong> ' + formatPrice(grandTotal) + '</div>' +
                '<div class="row" style="font-size:12px;opacity:0.8;margin-top:5px;"><strong>Méthode de paiement :</strong> Paiement sur place</div>' +
            '</div>' +
            '<div class="signature"><div>Conditions : Annulation gratuite 48h avant la date prévue.</div><div class="signature-line">Signature VelaroCar</div></div>' +
            '<div class="footer"><p>VelaroCar - Avenue Al Mhamid, Marrakech 40000, Maroc</p><p>velarocars26@gmail.com | +212 681 11 71 95</p><p style="margin-top:8px;">Ce document fait office de reçu de réservation. Conservez-le précieusement.</p></div>' +
            '</body></html>'
        );
        printWindow.document.close();
        setTimeout(function() { printWindow.print(); }, 500);
    }

})();
