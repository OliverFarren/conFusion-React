import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
/*
class CommentForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        console.log("Toggled modal");
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        alert('Current State is: ' + JSON.stringify(values));
    }

    render(){
        return(
            <div>
                <Button 
                    outline 
                    color="secondary"
                    onClick={this.toggleModal}
                >
                    <span
                        className="fa fa-pencil"
                    >
                        &nbsp;Submit Comment
                    </span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select
                                        model=".rating"
                                        className="form-control"
                                    >                                        >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option selected value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text
                                            model=".author"
                                            className="form-control"
                                            placeholder="Your Name"
                                            validators={{
                                                minLength: minLength(3),
                                                maxLength: maxLength(15)
                                            }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be at least 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />                                        
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                <Control.textarea
                                        model=".comment"
                                        className="form-control"
                                        rows="6"
                                />                                        
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button
                                        type="submit"
                                        color="primary"
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>

                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
*/
class CommentForm extends Component {
 
    constructor(props){
        super(props);
        this.SwitchModal = this.SwitchModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            toggleModal:false
        }
        
    }
    SwitchModal() {
        this.setState({
          toggleModal: !this.state.toggleModal
        });
      }
      handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
       this.SwitchModal();
    }
 
    render(){


return(<div>
    
    <Modal isOpen={this.state.toggleModal} toggle={this.SwitchModal}>
                    <ModalHeader toggle={this.SwitchModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                   
                    <Col className="form-group">
                    <Label>Rating</Label> 
                        
                              <Row md>
                                <Control.select model=".rating" name="rating"
                                        className="form-control">
                                      <option defaultValue> </option>
                                        <option  >1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>

                                    </Control.select>
                               
                                </Row>           
                               
                            </Col>
                            <Col md></Col>
                            <Col className="form-group">
                            <Label>Your Name</Label>
                                <Row md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder=" Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Row>
                            </Col>
                           
                            <Col className="form-group">
                                <Label htmlFor="comment"  >Comment</Label>
                                <Row md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Row>
                            </Col>
                          
                      
                            
                            <Row className="form-group">
                                <Col md={{size:10 }}>
                                    <Button type="submit" color="primary">
                                  Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
    
    <Button outline color="secondary" onClick={this.SwitchModal}>Submit  Comment</Button></div>);

    }
}

function RenderComments({comments}) {

    const commentList = comments.map((comment) => {
        return(
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>
                    -- {comment.author},
                    {new Intl.DateTimeFormat(
                        'en-US', 
                        {
                            year: 'numeric',
                            month: 'short',
                            day:'2-digit'
                        })
                        .format(new Date(Date.parse(comment.date)))
                    }
                </p>
            </li>
        );
    });

    if (comments != null) {

        return (
            <div>
                <h4 >Comments</h4>
                <ul className="list-unstyled">
                    {commentList}
                </ul>
                <CommentForm/>
            </div>
        );
    }
    else {
        return (<div></div>);
    }

}

function RenderDish({dish}) {
    return(
        <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );

}

const DishDetail = (props) => {
    console.log(props.comments);
    if (props.dish != null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments}/>
                    </div>
                </div>    
            </div>                
        );
    }
    else {
        return(<div></div>)
    }
}
//    <RenderComments comment={props.comments}/>

export default DishDetail;