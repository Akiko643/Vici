import react from "react";
import Card from "../Interview/Card";
const Speakers = () => {
    const ccard = [
        {
            image: "https://s2.im.ge/2021/06/13/QDbDY.png",
            header: "John Doe",
            subheader: "Director at Famous Company",
        },
        {
            image: "https://s2.im.ge/2021/06/13/QDcED.png",
            header: "John Doe",
            subheader: "Director at Famous Company",
        },
        {
            image: "https://s2.im.ge/2021/06/13/QDgv4.png",
            header: "John Doe",
            subheader: "Director at Famous Company",
        },
    ];
    return (
        <div className="flex justify-between flex-column mt-40">
            {ccard.map((card, index) => {
                return <Card card={card} index={index} />;
            })}
        </div>
    );
};
export default Speakers;
