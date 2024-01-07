import logo_noir from '../../assets/logo-noir.png'

function Marmoutier_logo(){
    return (
    
    <>
    <div
    style={{
            position: 'absolute',
            top: '0',
            left: '0',
            margin: '10px',
            scale:  '70%',
    }}>
    <img src={logo_noir} className="logo" alt="marmoutier logo"/>
    </div>
    </>
    )

}

export default Marmoutier_logo;