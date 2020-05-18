import { connect } from "react-redux";
export default ({ mapStateToProps, mapDispatchToProps }, SourceComponent) => {
  SourceComponent = connect(
    mapStateToProps,
    mapDispatchToProps
  )(SourceComponent);
  return SourceComponent;
};
