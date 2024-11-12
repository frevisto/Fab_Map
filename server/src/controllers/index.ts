import { Request,Response } from "express";
import pool from "../bd";


class Srvr {

    public async getEstado(req:Request, res:Response) : Promise<any> {
            const { lat, lon } = req.body;
        
            try {
                const result = await pool.query(
                    `SELECT nm_uf
                    FROM estados
                    WHERE ST_Contains(geom, ST_SetSRID(ST_Point($1, $2), 4326))`,
                    [lon, lat]
                );
        
                if (result.rows.length > 0) {
                    //objetivo
                    console.log("cheguei");
                    res.json({ estado: result.rows[0].nm_uf });
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