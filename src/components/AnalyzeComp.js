import axios from "axios";
import { Component } from "react";
import { Badge, Button, Col, Container, Label, Row } from "reactstrap";
import mammoth from 'mammoth';
import ReactQuill from "react-quill";
import { sanitize } from "dompurify";

class AnalyzeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      edit: false,
      keywords: [],
      documentHtml: ""
    };
  }

  componentDidMount = () => {
    let { formdata } = this.props;
    this.getKeywords();
    this.convertFiletoHtml(formdata.file);
  }

  getKeywords = () => {
      let { formdata } = this.props;
      let { jobTitle, jobDescription } = formdata;
      axios.post(
          "http://dev-879038229955-loadbalancer-926773935.eu-west-2.elb.amazonaws.com/CVDetails/extractKeywords",
          {jobTitle: jobTitle,"jobDescription":jobDescription}
      ).then((response) => {
          let res = response?.data;
          if(res?.status === "Success") {
              this.setState({
                  keywords: res?.data
              })
          }
          debugger;
      }).catch((error) => {
          console.log(error)
      })
  }

  edit = () => {
    let { edit } = this.state;
    this.setState({
      edit: !edit,
    });
  };

  analyze = () => {};

  removeKeyword = (keyword) => {
      let { keywords } = this.state;
      let filteredKeyword = keywords.filter((i) => i != keyword)
      debugger;
      this.setState({
          keywords: filteredKeyword
      })
  };

  convertFiletoHtml = (file) => {
    var reader = new FileReader()
    reader.onloadend =  (event) => {
      var arrayBuffer = reader.result
      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer })
        .then( (res) => {
          console.log(res.value)
          this.setState({
            documentHtml: res.value
          })
        })
        .done()
    }
    reader.readAsArrayBuffer(file)
  }

  render() {
    let { score, keywords, edit,documentHtml } = this.state;
    let { formdata } = this.props;
    return (
      <div>
        <Container>
          <Row className="p-5">
            <Col md="3" lg="3" sm="3">
              <h4>Score</h4>
              <div className="score">
                <div className="circle">
                  <h1>{score} %</h1>
                </div>
              </div>
              <h4 className="sub-title mt-3">Action</h4>
              <div className="btn-sec">
                <div>
                  <Row xs="2">
                    <Col md="6">
                      <Button
                        className="d-block w-100 blackBtn"
                        onClick={this.edit}
                      >
                        Edit
                      </Button>
                    </Col>
                    <Col md="6">
                      <Button className="blackBtn w-100" onClick={this.analyze}>
                        Analyze
                      </Button>
                    </Col>
                  </Row>

                  <Button className="d-block w-100 mt-2 primaryBtn">
                    Add to My list
                  </Button>
                </div>
                <h4 className="sub-title mt-3">Keywords({keywords.length}) </h4>
                {!keywords.length && <Label>No keywords </Label>}
                {!!keywords.length && (
                  <div className="key-words">
                    {keywords.map((i) => (
                      <div>
                        <Badge
                          onClick={()=>{this.removeKeyword(i)}}
                          data-id={i}
                          color="primary"
                          pill
                        >
                          {i}
                        </Badge>
                      </div>
                    ))}{" "}
                  </div>
                )}
              </div>
              <div>
              <Row xs="1">
                <Col style={{ 'flex-direction': 'row', display: 'flex' }}>
                  <h4 className="sub-title mt-3">Job Title</h4>
                  <Label
                    style={{ cursor: 'pointer' }}
                    className="w-100 d-flext item-center">
                    {formdata.jobTitle}
                    <Button
                      onClick={this.openModal}
                      color="link"
                      className="ml-auto p-0">
                    </Button>
                  </Label>
                </Col>
                <Col style={{ 'flex-direction': 'row', display: 'flex' }}>
                  <h4 className="sub-title mt-3">Job Description</h4>

                  <Label
                    style={{ cursor: 'pointer' }}
                    className="w-100 d-flext item-center">
                        {formdata.jobDescription}
                    <Button
                      onClick={this.openModal}
                      color="link"
                      className="ml-auto p-0">
                    </Button>
                  </Label>
                </Col>
              </Row>
            </div>
            </Col>
            <Col md="9" lg="9" sm="9">
              {
                !edit ?
                <div
                onDoubleClick={() => {
                  this.setState({edit:!edit})
                }}
                dangerouslySetInnerHTML={{
                  __html: sanitize(documentHtml),
                }}
              />
                :
                <ReactQuill
                  value={documentHtml}
                  preserveWhitespace={true}
                />
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default AnalyzeComp;
