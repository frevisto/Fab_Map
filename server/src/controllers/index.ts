import { Request, Response } from "express";
import pool from "../bd";


class Srvr {

    public async getEstado(req: Request, res: Response): Promise<any> {
        const { lat, lon } = req.body;
        try {
            const result = await pool.query(
                `SELECT nm_uf
                FROM estados
                WHERE ST_Contains(wkb_geometry, ST_SetSRID(ST_MakePoint($1,$2), 4674))
                LIMIT 1;`,
                [lon, lat]
            );

            if (result.rows.length > 0) {

                res.json({ estado: result.rows[0].nm_uf });

            } else {
                res.status(404).json({ error: 'Estado não encontrado para as coordenadas fornecidas' });
            }
        } catch (error) {
            console.error('Erro na consulta ao banco de dados:', error);
            res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }

    public async getCongresso(req: Request, res: Response): Promise<any> {
        const { lat, lon } = req.body;

        const fixedLat = -15.799727917206335;
        const fixedLon = -47.864255905151374;

        try {
            const result = await pool.query(
                `SELECT nm_uf,
                        ST_Distance(
                            ST_SetSRID(ST_MakePoint($1, $2), 4674),
                            ST_SetSRID(ST_MakePoint($3, $4), 4674)
                        ) AS distancia
                 FROM estados
                 WHERE ST_Contains(wkb_geometry, ST_SetSRID(ST_MakePoint($1, $2), 4674))
                 LIMIT 1;`,
                [lon, lat, fixedLon, fixedLat]
            );

            if (result.rows.length > 0) {
                const { nm_uf, distancia } = result.rows[0];
                res.json({ estado: nm_uf, distancia });
            } else {
                res.status(404).json({ error: 'Estado não encontrado para as coordenadas fornecidas' });
            }
        } catch (error) {
            console.error('Erro na consulta ao banco de dados:', error);
            res.status(500).json({ error: 'Erro interno no servidor' });
        }
    }
}



export default new Srvr;
