import "./kartu.scss";
import logo_pct from "./assets/logoPCT.png";
import React, { Component } from "react";

export default class Kartu extends Component {
	render() {
		return (
			<div className="page_ba">
				{["left", "right"].map((i) => {
					return (
						<div className={"coloum_p " + i} key={i}>
							<div className="header_ba">
								<img alt="logo_stpn" src={logo_pct} />
								<div className="header_text">
									SEKOLAH TINGGI PERTANAHAN NASIONAL
									<br />
									KEMENTERIAN AGRARIA DAN TATA RUANG / BADAN PERTANAHAN NASIONAL
									<br />
									<h1>PANITIA PENERIMAAN CALON TARUNA</h1>
									<p>
										Jl. Tata Bumi No. 5, Banyuraden, Gamping, Sleman,
										Yogyakarta, 55293
									</p>
								</div>
							</div>
							<div className="header_title_ba">
								<u>Seleksi Penerimaan Calon Taruna</u>
							</div>
							<br />
							{this.props.data !== null ? (
								<div className="title_ba">
									<table style={{ fontSize: "1vw" }}>
										<tbody>
											<tr>
												<td>NOMOR PENDAFTARAN</td>
												<td>:</td>
												<td>{this.props.data.nomor_daftar}</td>
											</tr>
											<tr>
												<td>NAMA PESERTA</td>
												<td>:</td>
												<td>{this.props.data.nama}</td>
											</tr>
											<tr>
												<td>TEMPAT / TANGGAL LAHIR</td>
												<td>:</td>
												<td>
													{this.props.data.tmp_lahir} /{" "}
													{this.props.data.tgl_lahir}
												</td>
											</tr>
											<tr>
												<td>JENIS KELAMIN</td>
												<td>:</td>
												<td>
													{this.props.data.is_lk === "1"
														? "LAKI-LAKI"
														: "PEREMPUAN"}
												</td>
											</tr>
											<tr>
												<td>PROGRAM STUDI</td>
												<td>:</td>
												<td>
													{this.props.data.prodi === "01"
														? "D-I PENGUKURAN DAN PEMETAAN KADASTRAL"
														: "D-IV PERTANAHAN"}
												</td>
											</tr>
											<tr>
												<td>NOMOR URUT</td>
												<td>:</td>
												<td>{this.props.data.kode_unik}</td>
											</tr>
											<tr>
												<td>PROVINSI</td>
												<td>:</td>
												<td>{this.props.data.provinsi.toUpperCase()}</td>
											</tr>
										</tbody>
									</table>
									<br />
									<br />
									<table className="styled-table_ba">
										<thead>
											<tr>
												<th>KESEHATAN</th>
												<th>KESAMAPTAAN</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td></td>
												<td></td>
											</tr>
										</tbody>
										<thead>
											<tr>
												<th>WAWANCARA</th>
												<th>VALIDASI BERKAS</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td></td>
												<td></td>
											</tr>
										</tbody>
									</table>
									<br />
									<p style={{ margin: 0 }}>
										<i>
											{i === "right"
												? "* lembar untuk peserta"
												: "* lembar untuk panitia"}
										</i>
									</p>
									<p style={{ margin: 0 }}>
										<i>* dicetak mengunakan kertas hvs dalam mode lanskap</i>
									</p>
									<p style={{ margin: 0, color: "red" }}>
										<i>* dipotong oleh panitia</i>
									</p>
									{/* <table className="ttd">
						<tbody>
							<tr>
								<td>
									Pusat Pengembangan Sumber Daya Manusia
									<br />
									Kementerian Agraria dan Tata Ruang/Badan Pertanahan Nasional
									<br />
									<br />
									<br />
									<b>
										<u>_______________________________</u>
									</b>
								</td>
								<td>
									Ketua Sekolah Tinggi Pertanahan Nasional
									<br />
									<br />
									<br />
									<br />
									<b>
										<u>Dr. Ir. Senthot Sudirman, M.S.</u>
									</b>
									<br />
									NIP. 19640815 199301 1 003
								</td>
							</tr>
						</tbody>
					</table>*/}
								</div>
							) : null}
						</div>
					);
				})}
			</div>
		);
	}
}
