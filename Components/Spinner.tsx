const Spinner = (props:any) => {
  let spanClass = 'spinner-border';
  if (props.size !== 'big') {
    spanClass += ' spinner-border-sm';
  }
  return <span className={spanClass} data-testid="spinner" role="status"></span>;
};
export default Spinner;
