<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * techProjectsByUsers
 */
class techProjectsByUsers
{
    /**
     * @var int
     */
    private $id;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @var \AppBundle\Entity\techUsers
     */
    private $usersByProjects;


    /**
     * Set usersByProjects
     *
     * @param \AppBundle\Entity\techUsers $usersByProjects
     * @return techProjectsByUsers
     */
    public function setUsersByProjects(\AppBundle\Entity\techUsers $usersByProjects = null)
    {
        $this->usersByProjects = $usersByProjects;

        return $this;
    }

    /**
     * Get usersByProjects
     *
     * @return \AppBundle\Entity\techUsers 
     */
    public function getUsersByProjects()
    {
        return $this->usersByProjects;
    }
    /**
     * @var \AppBundle\Entity\techProjects
     */
    private $projectsByProjects;


    /**
     * Set projectsByProjects
     *
     * @param \AppBundle\Entity\techProjects $projectsByProjects
     * @return techProjectsByUsers
     */
    public function setProjectsByProjects(\AppBundle\Entity\techProjects $projectsByProjects = null)
    {
        $this->projectsByProjects = $projectsByProjects;

        return $this;
    }

    /**
     * Get projectsByProjects
     *
     * @return \AppBundle\Entity\techProjects 
     */
    public function getProjectsByProjects()
    {
        return $this->projectsByProjects;
    }
}
