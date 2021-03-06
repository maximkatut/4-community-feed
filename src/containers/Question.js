import React, { Component } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import Card from "../components/Card/Card";

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 5%;
`;

const Alert = styled.div`
  text-align: center;
`;

const ROOT_API = "https://api.stackexchange.com/2.2/";

class Question extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: true,
      error: "",
    };
  }

  async componentDidMount() {
    try {
      const { match } = this.props;
      const question = await fetch(
        `${ROOT_API}questions/${match.params.id}?site=stackoverflow`
      );
      const questionJSON = await question.json();

      if (questionJSON) {
        this.setState({
          data: questionJSON,
          loading: false,
        });
      }
    } catch (error) {
      this.setState({
        loading: true,
        error: error.message,
      });
    }
  }

  render() {
    const { data, loading, error } = this.state;
    const { match } = this.props;
    if (loading || error) {
      return <Alert>{loading ? "Loading..." : error}</Alert>;
    }
    return (
      <>
        <Helmet>
          <title>{`Q&A Feed - Question #${match.params.id}`}</title>
        </Helmet>
        <QuestionWrapper>
          <Card key={data.items[0].question_id} data={data.items[0]} />
        </QuestionWrapper>
      </>
    );
  }
}

export default Question;
