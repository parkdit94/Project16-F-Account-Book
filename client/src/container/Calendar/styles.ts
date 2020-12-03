import styled from 'styled-components';

const HeaderDiv = styled.div`
  display: flex;
  height: 10%;
  width: 53%;
  margin-left: 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #616161;
  flex-direction: row;
  justify-content: space-between;
`;
const AmountDiv = styled.div`
  display: flex;
`;
const CalendarDiv = styled.div`
  display: inline-flex;
  height: 60%;
  padding: 0px, 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const TransactionDiv = styled.div`
  display: block;
`;

const CalendarPageDiv = styled.div`
  hight: 100%;
  width: 100%;
`;

const WarpCalendarDiv = styled.div`
  display: block;
  height: 100%;
  margin: 20px 0px;
  overflow: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AmountAlign = styled.div`
  display: block;
  position: right;
  text-align: right;
`;

const InOutDiv = styled.div`
  display: block;
  text-align: right;
`;

export {
  HeaderDiv,
  AmountDiv,
  CalendarDiv,
  TransactionDiv,
  CalendarPageDiv,
  WarpCalendarDiv,
  AmountAlign,
  InOutDiv,
};
