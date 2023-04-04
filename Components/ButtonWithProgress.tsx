import Spinner from './Spinner';

const ButtonWithProgress = (props:any) => {
  const { disabled, apiProgress, onClick } = props;
  return (
    <button
      type='button'
      className="btn btn-primary"
      disabled={disabled || apiProgress}
      onClick={onClick}
    >
      {apiProgress==true && <Spinner />}
      {props.children}
    </button>
  );
};

export default ButtonWithProgress;
