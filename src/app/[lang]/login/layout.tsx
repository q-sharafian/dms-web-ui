import { Locale } from "@/i18n/settings"

type Props = {
  children: React.ReactNode
  params: { lang: Locale }
}

const LoginLayout: React.FC<Props> = (props) => {
  return (
    <div style={{ margin: '0 16px' }}>
      {props.children}
    </div>
  );
}

export default LoginLayout;