import * as Preact from 'preact';

import './questions-page.scss';

import QuestionCard from './question-card';

class QuestionsPage extends Preact.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div class="questions-page"></div>
    );
  }

  async componentDidMount() {
    Preact.render(
    <>
      <QuestionCard universityUrl={this.props.universityUrl}/>
      <QuestionCard universityUrl={this.props.universityUrl}/>
      <QuestionCard universityUrl={this.props.universityUrl}/>
      <QuestionCard universityUrl={this.props.universityUrl}/>
      <QuestionCard universityUrl={this.props.universityUrl}/>
    </>,
    document.querySelector('.questions-page'))
  }
}

interface Props {
  universityUrl: string
}

export default QuestionsPage;