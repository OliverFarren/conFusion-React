import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Button, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false,
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {

        this.toggleModal();

        console.log(this.props.postComment);

        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);

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

function RenderComments({comments,postComment,dishId}) {

    const commentList = comments.map((comment) => {
        return(
            <Fade in>
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
            </Fade>
        );
    });

    if (comments != null) {

        return (
            <div>
                <h4 >Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {commentList}
                    </Stagger>
                </ul>
                <CommentForm
                    dishId={dishId}
                    postComment={postComment}
                />
            </div>
        );
    }
    else {
        return (<div></div>);
    }

}

function RenderDish({dish}) {
    return(
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}
        >
            <Card>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );

}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
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
                        <RenderComments 
                            comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
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