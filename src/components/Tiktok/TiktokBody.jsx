import BodyForm from "./BodyForm";
import BodyText from "./BodyText";

export default function TiktokBody() {
    return (
        <div className="tiktok-body">
            <div className="container">
                <div className="body-content">
                    <BodyText />
                    <BodyForm />
                </div>
            </div>
        </div>
    )
}

