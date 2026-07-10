// ===================================
// Firestore Service
// ===================================

const FirestoreService = {

    collection() {
        return db.collection(CONFIG.firestoreCollection);
    },

    async savePalette(data) {
        return await this.collection().add(data);
    },

    async updatePalette(id, data) {
        return await this.collection().doc(id).update(data);
    },

    async deletePalette(id) {
        return await this.collection().doc(id).delete();
    },

    async getAllPalettes() {
        const snapshot = await this.collection().get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    async searchOrder(auftrag, position) {
        const key = Utils.createOrderKey(auftrag, position);

        const snapshot = await this.collection()
            .where("auftragKey", "==", key)
            .where("ausgelagert", "==", false)
            .get();

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },
async searchOrders(orderKeys) {
    const uniqueKeys = [...new Set(
        orderKeys
            .map(key => String(key || "").trim())
            .filter(Boolean)
    )];

    if (!uniqueKeys.length) {
        return [];
    }

    const results = [];

    // Firestore verarbeitet "in"-Abfragen nur mit begrenzter Anzahl Werte.
    // Deshalb teilen wir größere Planungen in Blöcke auf.
    const chunkSize = 30;

    for (let index = 0; index < uniqueKeys.length; index += chunkSize) {
        const chunk = uniqueKeys.slice(index, index + chunkSize);

        const snapshot = await this.collection()
            .where("auftragKey", "in", chunk)
            .where("ausgelagert", "==", false)
            .get();

        snapshot.forEach(doc => {
            results.push({
                id: doc.id,
                ...doc.data()
            });
        });
    }

    return results;
},
    async findByPlace(bereich, platz) {
        const all = await this.getAllPalettes();

        return all.find(p =>
            p.ausgelagert === false &&
            p.bereich === bereich &&
            Number(p.platzVon) <= Number(platz) &&
            Number(p.platzBis) >= Number(platz)
        ) || null;
    },

    async isPlaceFree(bereich, platzVon, platzBis) {
        const all = await this.getAllPalettes();

        const von = Number(platzVon);
        const bis = Number(platzBis);

        return !all.some(p =>
            p.ausgelagert === false &&
            p.bereich === bereich &&
            Number(p.platzVon) <= bis &&
            Number(p.platzBis) >= von
        );
    },

    onRealtimeUpdate(callback) {
        return this.collection()
            .where("ausgelagert", "==", false)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                callback(data);
            });
    }

};
