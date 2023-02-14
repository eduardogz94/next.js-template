// .module.css not working in tests
// import styles from "./BaseTemplate.module.css";

export interface IBaseTemplate {
  sample: string;
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ sample }) => {
  return <div>{sample}</div>;
};

export default BaseTemplate;
