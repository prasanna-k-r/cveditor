import { Component, createRef } from "react";
import {
  Button,
  Col,
  Container,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Dropzone from "react-dropzone";
import AnalyzeComp from "./AnalyzeComp";

const dropzoneRef = createRef();
const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point
  if (dropzoneRef.current) {
    dropzoneRef.current.open();
  }
};
class UploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formdata: {
        jobTitle: "",
        jobDescription: "",
        file: "",
      },
      error: {
        jobTitle: "",
        jobDescription: "",
        file: "",
      },
      isAnalyzeComp : false
    };
  }
  handleChange = async (e) => {
    let { formdata } = this.state;
    const { name, value } = e.target;
    let tempFormdata = { ...formdata, [name]: value };
    this.setState({ formdata: tempFormdata });
  };

  proceed = async () => {
    let { formdata, isAnalyzeComp } = this.state;
    let tempError = {};
    Object.entries(formdata).forEach((err) => {
      if (err[1] === "") {
        tempError[err[0]] = `${err[0]} is Required`;
      }
    });
    this.setState({
      error: tempError,
    });
    if (!Object.keys(tempError).length) {
        this.setState({isAnalyzeComp:true}) 
    }
  };

  onDrop = (files) => {
    let { formdata } = this.state;
    if (!files.length) return;
    let tempFormdata = { ...formdata, file: files[0] };
    this.setState({ formdata: tempFormdata });
  };

  render() {
    let { formdata, error, isAnalyzeComp } = this.state;
    let { jobTitle, jobDescription } = formdata;
    return (
      <div>
        <Container>
            {
                !isAnalyzeComp ?
                    <div>
                        <Row>
                            <Col md="4" lg="4" sm="4">
                            <FormGroup>
                                <Label for="jobTitle">Job Title</Label>
                                <Input
                                type="text"
                                name="jobTitle"
                                id="jobTitle"
                                placeholder="Enter Job title"
                                value={jobTitle}
                                onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormFeedback style={{ display: "block" }}>
                                {error.jobTitle}
                            </FormFeedback>
                            <FormGroup>
                                <Label for="jobDescription">Job Description </Label>
                                <Input
                                type="textarea"
                                rows="10"
                                id="jobDescription"
                                name="jobDescription"
                                value={jobDescription}
                                onChange={this.handleChange}
                                placeholder="Description"
                                />
                            </FormGroup>
                            <FormFeedback style={{ display: "block" }}>
                                {error.jobDescription}
                            </FormFeedback>
                            </Col>
                            <Col md="8" lg="8" sm="8">
                            {/* Disable click and keydown behavior on the */}
                            <Dropzone
                                // ref={dropzoneRef}
                                noKeyboard
                                onDrop={this.onDrop}
                                accept=".doc,.docx"
                            >
                                {({ getRootProps, getInputProps, acceptedFiles }) => {
                                return (
                                    <div className="dropzone-container">
                                    <div {...getRootProps({ className: "dropzone" })}>
                                        <input {...getInputProps()} />
                                        <Button
                                        type="button"
                                        className="uploadBtn"
                                        onClick={openDialog}
                                        >
                                        UPLOAD FILE
                                        </Button>
                                    </div>
                                    </div>
                                );
                                }}
                            </Dropzone>
                            <FormFeedback style={{ display: "block" }}>
                                {error.file}
                            </FormFeedback>
                            </Col>
                        </Row>
                        <Button type="button" className="proceedBtn" onClick={this.proceed}>
                            Proceed
                        </Button>
                    </div>
                :
                <AnalyzeComp formdata={formdata}/>
            }
        </Container>
      </div>
    );
  }
}

export default UploadComponent;
