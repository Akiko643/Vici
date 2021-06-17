import React, { useEffect, useState } from "react";
import { useFirebase } from "../../Hooks/firebase";
import Card from "../Interview/Card";
const Speakers = () => {
    const [cardData, setCardData] = useState([]);
    const { firebase } = useFirebase();
    useEffect(async () => {
        const query = await firebase
            .firestore()
            .collection(`/content/contents/Interview`)
            .orderBy("createdAt", "desc")
            .limit(3);
        const snapshot = await query.get();
        const docs = snapshot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
        setCardData(docs);
    }, []);
    return (
        <div className="flex justify-between flex-column mt-40">
            {cardData.map((card, index) => {
                return <Card card={card} index={index} />;
            })}
        </div>
    );
};
export default Speakers;
