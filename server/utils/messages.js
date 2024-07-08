import moment from 'moment';

function formatMessage(gameName, text) {
  return {
    gameName,
    text,
    time: moment().format('h:mm a')
  };
}

export default formatMessage;
