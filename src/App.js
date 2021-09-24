import React, { Component } from "react";
import "./component.scss";
import logoSTPN from "./logo192.png";
import { Cari, Loading, Skeleton } from "./Component";
import axios from "axios";
import { animateScroll } from "react-scroll";
import ReCAPTCHA from "react-google-recaptcha";
import md5 from "md5";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import Kartu from "./Kartu";

const URL_PENGUMUMAN =
	"http://data.stpn.ac.id/penerimaan/D4/2021/Pengumuman%20Kelulusan%20CBT%20STPN%202021.pdf";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			loadingApp: true,
			notBot: false,
			loadData: false,
			nomor: "",
			nama: "",
			date: "",
			// nomor: "202110101238",
			// nama: "IBRAHIM AQEEL AMANULLAH",
			// date: "2003-11-23",
			data: [],
			salah: false,
			msg: "",
		};
		this.onLoadFinish = this.onLoadFinish.bind(this);
		this.tableRef = React.createRef();
		this.kartuRef = React.createRef();
	}

	onLoadFinish() {
		this.setState({ loadingApp: false });
		// this.interval = setInterval(() => this.loadData(), INTERVAL_UPDATE_DATA);
	}

	dataQueryString(data = {}) {
		return Object.entries(data)
			.map(
				([key, value]) =>
					`${encodeURIComponent(key)}=${encodeURIComponent(value)}`
			)
			.join("&");
	}

	veryfyHUman = async (value) => {
		this.setState({ notBot: value.length > 0 });
		// let headers = {
		// 	"Content-Type": "application/x-www-form-urlencoded",
		// };
		// let body = {
		// 	secret: "6Le-wn4cAAAAAJBdN6XtQ6fEEi3KmyQU1pJ8DL8W",
		// 	response: value,
		// };
		// await axios
		// 	.post(
		// 		"https://www.google.com/recaptcha/api/siteverify",
		// 		this.dataQueryString(body),
		// 		{
		// 			headers,
		// 		}
		// 	)
		// 	.then((response) => {
		// 		if (response.data) {
		// 			if (response.data.success) {
		// 				this.setState({ notBot: true });
		// 			}
		// 		}
		// 	});
	};

	loadData = async (load) => {
		if (
			(!this.state.loading || !this.state.loadData) &&
			this.state.nama !== "" &&
			this.state.nomor !== ""
		) {
			if (!this.state.loadData) this.setState({ loadData: true, salah: false });
			let loading = load || false;
			if (loading) {
				this.setState({ loading: loading });
				animateScroll.scrollToTop({
					duration: 800,
					delay: 0,
					smooth: "easeInOutQuart",
				});
			}
			let body = {
				cari: this.state.nomor,
				key: "",
				page: 1,
				limit: 1,
				sort_jk: 0,
				sort_nl: 0,
				sort_lulus: 0,
				sort_prov: 0,
				id_daerah: 0,
				id_sesi: 0,
				id_prodi: 0,
			};
			body.key = md5(
				body.cari.toString() +
					body.id_daerah.toString() +
					body.id_sesi.toString() +
					body.id_prodi.toString() +
					body.page.toString() +
					body.sort_jk.toString() +
					body.sort_nl.toString() +
					body.sort_prov.toString() +
					body.sort_lulus.toString() +
					"6rw3xm49"
			);
			let headers = {
				"Content-Type": "application/x-www-form-urlencoded",
			};
			await axios
				.post(
					// "http://10.0.21.30/rest_score/index.php/score",
					"http://penerimaan.stpn.ac.id/api_livescore/rest_score/index.php/score",
					this.dataQueryString(body),
					{ headers }
				)
				.then((response) => {
					if (response.data.data.length > 0) {
						if (
							response.data.data[0].nama.split(" ").join("") ===
								this.state.nama.toUpperCase().split(" ").join("") &&
							response.data.data[0].nomor_daftar === this.state.nomor &&
							response.data.data[0].tgl_lahir ===
								this.state.date.split("-").reverse().join("-")
						) {
							this.setState({
								data: response.data.data,
							});
						} else {
							this.setState({
								data: [],
								nama: "",
								nomor: "",
								salah: true,
								notBot: false,
								msg: "ⓘ Kombinasi nama dan nomor penerimaan tidak ditemukan",
							});
						}
					} else {
						this.setState({
							data: [],
							nama: "",
							nomor: "",
							salah: true,
							notBot: false,
							msg: "ⓘ Kombinasi nama dan nomor ujian tidak ditemukan",
						});
					}
					if (this.state.loading) this.setState({ loading: false });
					if (this.state.loadData) this.setState({ loadData: false });
				})
				.catch((e) => {
					console.log(e);
					this.setState({ loading: false, loadData: false });
				});
		}
	};

	componentDidMount() {
		window.addEventListener("load", this.onLoadFinish);
		// window.addEventListener("scroll", this.headerOnScroll);
	}

	componentWillUnmount() {
		window.removeEventListener("load", this.onLoadFinish);
		// clearInterval(this.interval);
	}

	headerOnScroll() {
		const distanceY = window.pageYOffset || document.documentElement.scrollTop,
			shrinkOn = 50,
			headerElement = document.getElementById("header");
		if (window.innerWidth > shrinkOn) {
			if (distanceY > shrinkOn) {
				if (headerElement !== null) {
					headerElement.classList.add("scroll");
				}
			} else {
				if (headerElement !== null) {
					headerElement.classList.remove("scroll");
				}
			}
		}
	}

	exportData(func) {
		func();
	}

	render() {
		return (
			<div className="App">
				<Loading active={this.state.loadingApp} />
				<div className="header scroll" id="header">
					<img alt="logo stpn" src={logoSTPN} className="logo" />
					<div className="title">
						Sekolah Tinggi Pertanahan Nasional
						<p>
							Kementerian Agraria dan Tata Ruang / Badan Pertanahan Nasional
						</p>
					</div>
					<div className="headerText">CBT STPN 2021</div>
				</div>
				<div className="content">
					<div id="particle-container">
						{[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((d, i) => {
							return <div key={i} className="particle"></div>;
						})}
					</div>
					{/* Content start */}
					<div className="container" id="container">
						<h1 ref={this.tableRef}>PENGUMUMAN HASIL UJIAN</h1>
						<h4 style={{ margin: "0px", color: "gray", marginTop: "20px" }}>
							<i>COMPUTER BASSED TEST (CBT)</i>
						</h4>
						<h6 style={{ color: "gray", marginTop: "0" }}>
							PENERIMAAN CALON TARUNA STPN TAHUN 2021
						</h6>
						{!this.state.loading ? (
							this.state.data.length > 0 ? (
								<div className="wrapper">
									<table className="styled-table">
										<tbody>
											<tr>
												<th>Nomor Pendaftaran</th>
												<th>:</th>
												<th className="no">
													{this.state.data[0].nomor_daftar}
												</th>
											</tr>
											<tr>
												<th>Nama Peserta</th>
												<th>:</th>
												<th className="no">{this.state.data[0].nama}</th>
											</tr>
											<tr>
												<th>Tempat, Tanggal Lahir</th>
												<th>:</th>
												<th className="no">
													{this.state.data[0].tmp_lahir +
														", " +
														this.state.data[0].tgl_lahir}
												</th>
											</tr>
											<tr>
												<th>Jenis Kelamin</th>
												<th>:</th>
												<th className="no">
													{this.state.data[0].is_lk === "1"
														? "Laki - Laki"
														: "Perempuan"}
												</th>
											</tr>
											<tr>
												<th>Provinsi</th>
												<th>:</th>
												<th className="no">{this.state.data[0].provinsi}</th>
											</tr>
											<tr>
												<th>Program Studi</th>
												<th>:</th>
												<th className="no">
													{this.state.data[0].prodi === "01"
														? "Diploma I - PPK"
														: "Diploma IV - Pertanahan"}
												</th>
											</tr>
											{this.state.data[0].lulus === "1" ? (
												<tr>
													<th>Nomor Urut Lulus CBT</th>
													<th>:</th>
													<th className="no">{this.state.data[0].kode_unik}</th>
												</tr>
											) : null}
										</tbody>
									</table>
									<br />
									<table
										style={{ marginBottom: "50px" }}
										className="styled-table"
									>
										<thead>
											<tr>
												{this.state.data[0].lulus === "1" ? (
													<td
														style={{ backgroundColor: "green" }}
														className="pengumuman"
													>
														SELAMAT ANDA{" "}
														<b>
															<u>LULUS UJIAN CBT STPN TAHUN 2021</u>
														</b>
													</td>
												) : this.state.data[0].lulus === "2" ? (
													<td
														style={{ backgroundColor: "grey" }}
														className="pengumuman"
													>
														ANDA
														<u>
															<b> LULUS UJIAN CBT STPN TAHUN 2021 </b>
														</u>
														SEBAGAI CADANGAN
													</td>
												) : (
													<td
														style={{ backgroundColor: "#800000" }}
														className="pengumuman"
													>
														MOHON MAAF ANDA
														<u>
															<b> TIDAK LULUS</b> UJIAN CBT STPN TAHUN 2021
														</u>
													</td>
												)}
											</tr>
										</thead>
										<tbody>
											<tr>
												{this.state.data[0].lulus === "1" ? (
													<td style={{ padding: "30px", textAlign: "center" }}>
														<i>
															Untuk informasi dan tahapan seleksi selanjutnya
															silahkan lihat pengumuman dibawah ini
														</i>
														<br />
														<button
															onClick={() =>
																window.open(URL_PENGUMUMAN, "_blank")
															}
															className="lolos_button"
														>
															Lihat
														</button>
														<br />
														<Kartu
															ref={this.kartuRef}
															data={this.state.data[0]}
														/>
														<ReactToPrint
															pageStyle={"margin=10"}
															documentTitle={new Date()}
															onBeforeGetContent={() =>
																this.setState({ loadingApp: true })
															}
															content={() => this.kartuRef.current}
															onAfterPrint={() =>
																this.setState({ loadingApp: false })
															}
														>
															<PrintContextConsumer>
																{({ handlePrint }) => (
																	<button
																		onClick={() => this.exportData(handlePrint)}
																		style={{ backgroundColor: "green" }}
																		className="lolos_button"
																	>
																		Unduh Kartu Tahapan Selanjutnya
																	</button>
																)}
															</PrintContextConsumer>
														</ReactToPrint>
													</td>
												) : this.state.data[0].lulus === "2" ? (
													<td style={{ padding: "30px", textAlign: "center" }}>
														<i>
															Peserta lulus cadangan dapat mengikuti seleksi
															tahap berikutnya apabila terdapat peserta lulus
															ujian CBT yang dinyatakan gagal dan/atau
															mengundurkan diri dalam tahapan seleksi
														</i>
														<br />
														<i>
															Untuk informasi lebih lanjut silahkan lihat
															pengumuman dibawah ini
														</i>
														<br />
														<button
															onClick={() =>
																window.open(URL_PENGUMUMAN, "_blank")
															}
															className="lolos_button"
														>
															Lihat
														</button>
														<br />
													</td>
												) : (
													<td style={{ padding: "30px", textAlign: "center" }}>
														<i>
															Terimakasih telah mengikuti seleksi Penerimaan
															Calon Taruna Sekolah Tinggi Pertanahan Nasional
															Tahun 2021
														</i>
														<br />
													</td>
												)}
											</tr>
										</tbody>
									</table>
								</div>
							) : (
								<div className="wrapper">
									<div className="data-tables">
										<p
											style={
												!this.state.salah
													? { display: "none" }
													: { display: "block" }
											}
										>
											{this.state.msg}
										</p>
										<div style={{ padding: "0" }} className="filter">
											<Cari
												id="cari_nomor"
												placeholder="2021xxxxx"
												type="number"
												label="Nomor pendaftaran"
												enter={() => this.loadData(true)}
												value={this.state.nomor}
												onChange={(value) =>
													this.setState({
														nomor: value,
													})
												}
											/>
										</div>
										<div style={{ padding: "0" }} className="filter">
											<Cari
												id="cari_nama"
												placeholder="Nama Peserta"
												type="text"
												label="Nama Lengkap"
												enter={() => this.loadData(true)}
												value={this.state.nama}
												onChange={(value) =>
													this.setState({
														nama: value,
													})
												}
											/>
										</div>
										<div style={{ padding: "0" }} className="filter">
											<Cari
												id="cari_date"
												placeholder="01-01-2001"
												type="date"
												label="Tanggal lahir"
												enter={() => this.loadData(true)}
												value={this.state.date}
												onChange={(value) =>
													this.setState({
														date: value,
													})
												}
											/>
										</div>
										<div style={{ display: "inline-block", margin: "20px" }}>
											<ReCAPTCHA
												stoken="6Lem77UZAAAAAHrX-oJ4nEhxOjMKkirmiL4F36cz"
												onChange={this.veryfyHUman}
												onExpired={() => this.setState({ notBot: false })}
												onErrored={() => this.setState({ notBot: false })}
												sitekey="6Lem77UZAAAAAC7u6L7nF7JsApCjTTWXfRoedspi"
											/>
											<button
												disabled={
													this.state.loading ||
													!this.state.notBot ||
													this.state.nama === "" ||
													this.state.nomor === ""
												}
												onClick={() => this.loadData(true)}
												className="apply-button"
											>
												Cari
											</button>
										</div>
									</div>
									<div style={{ textAlign: "center" }} className="message_info">
										<b>
											<p>
												ⓘ Nomor pendaftaran dan nama lengkap harus sesuai dengan
												yang tertera pada kartu peserta ujian
											</p>
											<p>
												Gunakan link dibawah ini untuk jika lupa nomor
												pendaftaran
											</p>
											{/* <p style={{ textAlign: "center" }}>✆ +62 896-1850-9942</p> */}
											<br />
											{/* <button http://penerimaan.stpn.ac.id/simreg/cek_email.php?prodi=01&111=111 */}
											<button
												style={{ backgroundColor: "orange", color: "white" }}
												onClick={() =>
													window.open(
														" http://penerimaan.stpn.ac.id/simreg/cek_email.php?prodi=01&111=111",
														"_blank"
													)
												}
												className="apply-button"
											>
												Prodi D-I
											</button>
											<button
												style={{ backgroundColor: "red", color: "white" }}
												onClick={() =>
													window.open(
														" http://penerimaan.stpn.ac.id/simreg/cek_email.php?prodi=02&111=111",
														"_blank"
													)
												}
												className="apply-button"
											>
												Prodi D-IV
											</button>
										</b>
									</div>
								</div>
							)
						) : (
							<Skeleton count={10} />
						)}
					</div>
					{/* Content end */}
				</div>
				<div className="footer">
					&copy; 2021 Sekolah Tinggi Petanahan Nasional
				</div>
			</div>
		);
	}
}

export default App;
