import { Component } from "react";
import { Container } from "reactstrap";
import UploadComponent from "./UploadComponent";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <Container className="body-container">
                    <h3 className="main-title text-center">
                        Orangesand <span>Resourcing</span>
                    </h3>
                    <p className="text-center">
                        Keyword generator + Simple CV editor for faster and better job
                        applications
                    </p>
                </Container>
                <UploadComponent/>
            </div>
        )
    }
}

export default Dashboard;