import { Container, InputSearchContainer, Header, ListContainer, Card } from './styles'

import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'

export default function Home() {
	return (
		<Container>
			<InputSearchContainer>
				<input type="text" placeholder="Pesquise pelo nome..." />
			</InputSearchContainer>

			<Header>
				<strong>3 contatos</strong>
				<a href="/">Novo contato</a>
			</Header>

			<ListContainer>
				<header>
					<button type="button">
						<span>Nome</span>
						<img src={arrow} alt="Seta" />
					</button>
				</header>

				<Card>
					<div className="info">
						<div className="contact-name">
							<strong>Daniel Corona</strong>
							<small>instagram</small>
						</div>
						<span>danielcorona313@gmail.com</span>
						<span>(27) 99999-9999</span>
					</div>

					<div className="actions">
						<a href="/">
							<img src={edit} alt="Editar" />
						</a>
						<button type="button">
							<img src={trash} alt="Deletar" />
						</button>
					</div>
				</Card>

				<Card>
					<div className="info">
						<div className="contact-name">
							<strong>Daniel Corona</strong>
							<small>instagram</small>
						</div>
						<span>danielcorona313@gmail.com</span>
						<span>(27) 99999-9999</span>
					</div>

					<div className="actions">
						<a href="/">
							<img src={edit} alt="Editar" />
						</a>
						<button type="button">
							<img src={trash} alt="Deletar" />
						</button>
					</div>
				</Card>

				<Card>
					<div className="info">
						<div className="contact-name">
							<strong>Daniel Corona</strong>
							<small>instagram</small>
						</div>
						<span>danielcorona313@gmail.com</span>
						<span>(27) 99999-9999</span>
					</div>

					<div className="actions">
						<a href="/">
							<img src={edit} alt="Editar" />
						</a>
						<button type="button">
							<img src={trash} alt="Deletar" />
						</button>
					</div>
				</Card>
			</ListContainer>
		</Container>
	)
}
